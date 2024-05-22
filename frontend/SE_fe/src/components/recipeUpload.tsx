/*
import React, { useState, FormEvent } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  VStack,
} from "@chakra-ui/react";

interface RecipeFormData {
  recipeName: string;
  ingredients: string;
  prepTime: number;
  cookTime: number;
  directions: string;
}

const RecipeForm: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [prepTime, setPrepTime] = useState<number>(0);
  const [cookTime, setCookTime] = useState<number>(0);
  const [directions, setDirections] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const recipeData: RecipeFormData = {
      recipeName,
      ingredients,
      prepTime,
      cookTime,
      directions,
    };
    console.log(recipeData); // For now, just log data to the console
    // Here you would typically send data to the server
  };

  return (
    <Box maxW="md" mx="auto" p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Ingredients</FormLabel>
            <Textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Prep Time (minutes)</FormLabel>
            <NumberInput
              min={1}
              max={480}
              value={prepTime}
              onChange={(valueString) => setPrepTime(parseFloat(valueString))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Cook Time (minutes)</FormLabel>
            <NumberInput
              min={1}
              max={480}
              value={cookTime}
              onChange={(valueString) => setCookTime(parseFloat(valueString))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Directions</FormLabel>
            <Textarea
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              placeholder="Cooking directions"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit Recipe
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RecipeForm;
*/

import React, { useState, FormEvent } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

interface RecipeFormData {
  title: string;
  description: string;
  equipment: string; // This field is optional, adjust as necessary
  ingredients: string;
  instructions: string;
}

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const recipeData: RecipeFormData = {
      title,
      description,
      equipment,
      ingredients,
      instructions,
      
    };
  
    try {
      const response = await fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
  
      if (response.ok) {
        // Recipe added successfully, you can redirect or show a success message
        toast({
          title: "Recipe added successfully",
          description: "You have successfully uploaded your recipe.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log('Recipe added successfully');
      } else {
        // Handle error response
        toast({
          title: "Error.",
          description: "There was an error uploading your recipe.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error('Failed to add recipe');
      }
    } catch (error) {
      // Handle network error
      toast({
        title: "Error.",
        description: "There was an error uploading your recipe.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Network error:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe title"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the recipe"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Equipment</FormLabel>
            <Textarea
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="List required equipment, if any"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Ingredients</FormLabel>
            <Textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Instructions</FormLabel>
            <Textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step cooking instructions"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit Recipe
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RecipeForm;
