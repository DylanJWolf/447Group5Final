/*


import React, { useState } from "react";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LogIn";
import RecipeUpload from "./components/recipeUpload";
import SearchBar from "./components/SearchBar"; // Make sure the path to SearchBar is correct

const App: React.FC = () => {
  const [view, setView] = useState<string>("login"); // 'login' or 'recipeUpload'

  const handleNavigation = (viewName: string) => {
    setView(viewName);
  };

  return (
    <>
      <NavBar />
      <SearchBar /> {}
      <Button onClick={() => handleNavigation("login")}>Login</Button>
      <Button onClick={() => handleNavigation("recipeUpload")}>
        Upload Recipe
      </Button>
      <Grid templateAreas={{ lg: `"nav nav" "aside main"` }}>
        <GridItem area="nav" bg="gold"></GridItem>

        <GridItem area="aside" bg="darkgoldenrod"></GridItem>

        <GridItem area="main" bg="darkgoldenrod">
          {view === "login" && <LoginForm />}
          {view === "recipeUpload" && <RecipeUpload />}
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
*/

import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LogIn";
import RecipeUpload from "./components/recipeUpload";
import ProfilePage from "./components/ProfilePage";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [view, setView] = useState<string>("login"); // 'login', 'recipeUpload', or 'profile'

  return (
    <>
      <NavBar onNavigate={setView} />
      <SearchBar />
      <Grid templateAreas={{ lg: `"nav nav" "aside main"` }}>
        <GridItem area="nav" bg="gold"></GridItem>
        <GridItem area="aside" bg="darkgoldenrod"></GridItem>
        <GridItem area="main" bg="darkgoldenrod">
          {view === "login" && <LoginForm />}
          {view === "recipeUpload" && <RecipeUpload />}
          {view === "profile" && <ProfilePage />}
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
