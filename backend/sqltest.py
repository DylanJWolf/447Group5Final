# This is a simple script for testing the connection to our database.

import pymysql

hostname = 'localhost'
user = 'root'
password = 'teamFive'

# Initializing connection
db = pymysql.connections.Connection(
    host=hostname,
    user=user,
    password=password
)

# Creating cursor object
cursor = db.cursor()



# Reset recipes db
cursor.execute("DROP DATABASE IF EXISTS recipes_db")
cursor.execute("CREATE DATABASE IF NOT EXISTS recipes_db")

cursor.execute("SHOW DATABASES")

# Displaying databases
for databases in cursor:
    print(databases)

# Closing the cursor and connection to the database
cursor.close()
db.close()