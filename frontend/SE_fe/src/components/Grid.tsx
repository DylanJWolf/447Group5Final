import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
/* db import herwe*/

interface Recipe {
  id: number;
  name: string;
  directions: string;
}

interface FetchRecipes {
  count: number;
  results: Recipe[];
}

const Grid = () => {
  const [recipe, setRecip] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  /* Include with DB stuff*/
  useEffect(() => {});

  /* Error Handling exists here 9 :: 630 */
  return (
    <>
      {error && <Text> {error} </Text>}
      <ul>
        {recipe.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
};
