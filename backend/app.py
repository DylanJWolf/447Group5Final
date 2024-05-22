from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, func
from functools import wraps
from elasticsearch import Elasticsearch
import pandas as pd
from datetime import datetime

# Creating Flask app
app = Flask(__name__)
app.secret_key = 'teamFive'
CORS(app)
es = Elasticsearch(['http://localhost:9200'])
es.indices.create(index='user_index', ignore=400)
es.indices.create(index='recipe_index', ignore=400)

SESSION_TYPE = 'filesystem'
SESSION_PERMANENT = True
SESSION_KEY_PREFIX = 'gis'
SESSION_COOKIE_HTTPONLY = True
SESSION_USE_SIGNER = True

# Creating SQLAlchemy instance
db = SQLAlchemy()

user = "root"
pin = "teamFive"
host = "localhost"
db_name = "recipes_db"

# Configuring database URI
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{user}:{pin}@{host}/{db_name}"

# Disable modification tracking
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initializing Flask app with SQLAlchemy
db.init_app(app)

class User(db.Model):
    __tablename__ = "user"
    user_id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(500), unique=True, nullable=False)
    password = db.Column('password', db.String(500), nullable=False)
    email = db.Column('email', db.String(500), nullable=False)

    recipe = relationship("Recipe", backref='user')

class Recipe(db.Model):
    __tablename__ = "recipe"
    recipe_id = db.Column('recipe_id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, ForeignKey('user.user_id'))
    title = db.Column('title', db.String(500), nullable=False)
    description = db.Column('description', db.Text, nullable=False)
    equipment = db.Column('equipment', db.Text, nullable=False)
    ingredients = db.Column('ingredients', db.Text, nullable=False)
    instructions = db.Column('instructions', db.Text, nullable=False)
    upload_date = db.Column('upload_date', db.Date, nullable=True)

class Session(db.Model):
    __tablename__ = "session"
    session_id = db.Column('session_id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(500), unique=True, nullable=False, default = "None")

def create_db():
    with app.app_context():
        db.create_all()
    
# Home route, displays all recipes
@app.route("/recipes")
def getRecipes():
    recipes = Recipe.query.all()
    # Serialize the recipes data to JSON
    recipes_data = [{"recipe_id": recipe.recipe_id, "title": recipe.title, "ingredients": recipe.ingredients} for recipe in recipes]
    return jsonify(recipes_data)

# Show all users, for admin use only
@app.route("/users")
def getUsers():
    users = User.query.all()
    # Serialize the recipes data to JSON
    user_data = [{"username": user.username, "email": user.email, "password": user.password} for user in users]
    return jsonify(user_data)

# Show the current session, for admin use only.
@app.route("/sessions")
def getSessions():
    sessions = Session.query.all()
    # Serialize the recipes data to JSON
    sessions_data = [{"username": session.username} for session in sessions]
    return jsonify(sessions_data)

@app.route("/add", methods=['POST', 'OPTIONS'])
def add_recipe():
    current_username = Session.query.first().username
    current_user_id = User.query.filter_by(username=current_username).first().user_id

    if request.method == 'POST':
        data = request.json
        # Create new Recipe object
        new_recipe = Recipe(
            user_id = current_user_id,
            title=data.get("title"),
            description=data.get("description"),
            equipment=data.get("equipment"),
            ingredients=data.get("ingredients"),
            instructions=data.get("instructions"),
            upload_date=datetime.today().date()
        )
        db.session.add(new_recipe)
        db.session.commit()
    return jsonify("Recipe added to database")

### Remove and Edit functions need to be reconfigured and intigrated with the frontend. ###

# @app.route("/remove", methods=['POST', 'OPTIONS'])
# def remove_recipe():
#     if request.method == 'POST':
#         recipe_title = request.form.get('title')
#         recipe_to_delete = Recipe.query.filter_by(title=recipe_title).first()

#         if recipe_to_delete:
#             # Delete the recipe
#             db.session.delete(recipe_to_delete)
#             db.session.commit()

#     return render_template("remove_recipe.html")

# @app.route("/edit", methods=['POST', 'OPTIONS'])
# def edit_recipe():
#     if request.method == 'POST':
#         # Get updated recipe details from the form
#         recipe_title = request.form.get('title')
#         recipe_ingredients = request.form.get('ingredients')
#         recipe_to_edit = Recipe.query.filter_by(title=recipe_title).first()

#         # Update the recipe with the new details
#         if recipe_to_edit:
#             recipe_to_edit.title = recipe_title
#             recipe_to_edit.ingredients = recipe_ingredients
#             # Commit the changes to the database
#             db.session.commit()

#     return render_template("edit_recipe.html")

@app.route("/search", methods=['GET', 'POST', 'OPTIONS'])
def search_recipe():
    if request.method == 'POST':
        # # # fill_db() # Only do this once!
        data = request.json
        search_term = data.get('search_term')
        hard_update_elasticsearch()
        search_query = {
            "query": {
                "multi_match": {
                    "query": search_term,
                    "fields": ["title", "description", "equipment", "ingredients", "instructions"],
                    "fuzziness": "AUTO"
                }
            }
        }
        result = es.search(index='recipe_index', body=search_query)
        hits = result["hits"]["hits"]
        return jsonify(hits)
    return jsonify("what are you doing")

@app.route("/register", methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify("That username is already in use")

        # Create a new user
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()

    return jsonify("Registration successful.")

@app.route("/login", methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')
        # Check if the username and password match
        verified_user = User.query.filter_by(username=username, password=password).first()
        if verified_user:
            # Store the username in the session to indicate the user is logged in
            session_count = db.session.query(func.count(Session.username)).scalar()
            print(session_count)
            # Nobody has ever logged in yet apparently
            if session_count == 0:
                init_session = Session(username=username)
                db.session.add(init_session)
                db.session.commit()
                print(Session.query.first())
            else:
                session_entry = Session.query.first()
                session_entry.username = username
                db.session.commit()
                
        else:
            return jsonify("User not found")
        
    return jsonify("Login succesful")

# Same as update_elasticsearch, except it clears elasticsearch first
# Use after adding, modifying or removing a recipe, or for testing purposes
def hard_update_elasticsearch():
    es.indices.delete(index='user_index')
    es.indices.delete(index='recipe_index')
    update_elasticsearch()
    return

# makes sure elasticsearch database matches the MySQL database
# This can be used at startup and periodically
# Use this after adding or modifying a recipe
def update_elasticsearch():
    all_users = User.query.all()  # In order to access data from all_users, do all_users[n].column, to get specific data
    for user in all_users:
        user_entity = {
            'user_id': user.user_id,
            'username': user.username,
            'password': user.password,
            'email': user.email
        }
        es.index(index='user_index', id=user.user_id, body=user_entity)
        es.indices.refresh(index='user_index')

    all_recipes = Recipe.query.all()
    for recipe in all_recipes:
        recipe_entity = {
            'recipe_id': recipe.recipe_id,
            'user_id': recipe.user_id,
            'title': recipe.title,
            'description': recipe.description,
            'equipment': recipe.equipment,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'upload_date': recipe.upload_date
        }
        es.index(index='recipe_index', id=recipe.recipe_id, body=recipe_entity)
        es.indices.refresh(index='recipe_index')
    return

# Used to preload the database with a bunch of recipes
# Only use this once!
def fill_db():
    new_user = User(
        username = "dylanw",
        password = "dylanw",
        email = "dylanw3@umbc.edu"
    )
    db.session.add(new_user)
    db.session.commit()
    filler_recipes = pd.read_csv("RAW_recipes.csv")
    count = 0
    for index, row in filler_recipes.iterrows():
        if count < 100:
            try:
                new_recipe = Recipe(
                    user_id=new_user.user_id,
                    title=row['name'],
                    description=row['description'],
                    equipment="not provided",
                    ingredients=row['ingredients'],
                    instructions=row['steps'],
                    upload_date=datetime.today().date(),
                )
                db.session.add(new_recipe)
                db.session.commit()
                count += 1
            except:
                db.session.rollback()  # Rollback the session to undo the failed insertion
                print(f"Error inserting recipe: {row['name']}. Skipping...")
                continue
        else:
            break

if __name__ == "__main__":
    create_db()
    with app.app_context():
        Session.query.first().username = "None"
        db.session.commit()
    app.run(debug=True)
