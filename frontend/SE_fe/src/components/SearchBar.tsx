/*
import React from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

const SearchBar: React.FC = () => {
  return (
    <Flex>
      <Input placeholder="Search recipes..." />
      <Button ml="2">Search</Button>
    </Flex>
  );
};

export default SearchBar;
*/

import React, { useState } from "react";
import { Input, Button, Flex, Text } from "@chakra-ui/react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const body = {
      search_term: query,
    };

    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setRecipes(data.map((hit: any) => hit._source)); // Extracting recipe data from hits
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Flex>
      <Input
        placeholder="Search recipes..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={(event) => event.key === "Enter" && handleSearch()}
      />
      <Button onClick={handleSearch} ml="2">
        Search
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.ingredients}</p>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

export default SearchBar;