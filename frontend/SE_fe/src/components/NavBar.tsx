/*

import { HStack, Image, Heading } from "@chakra-ui/react";
import logo from "../assets/Recipe_Logo.webp";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="100px" />
      <Heading as="h1" size="lg">
        Welcome To The Great Recipe Book!
      </Heading>{" "}
    </HStack>
  );
};

export default NavBar;
*/

import React from "react";
import { HStack, Image, Heading, Button } from "@chakra-ui/react";
import logo from "../assets/Recipe_Logo.webp";

interface NavBarProps {
  onNavigate: (view: string) => void; // Function to handle navigation
}

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  return (
    <HStack justifyContent="space-between" width="100%" padding="4">
      <HStack>
        <Image src={logo} boxSize="100px" />
        <Heading as="h1" size="lg">
          Welcome To The Great Recipe Book!
        </Heading>
      </HStack>
      <HStack>
        <Button onClick={() => onNavigate("profile")} colorScheme="teal">
          Profile
        </Button>
        <Button onClick={() => onNavigate("login")} colorScheme="teal">
          Home
        </Button>
        <Button onClick={() => onNavigate("recipeUpload")} colorScheme="teal">
          Upload Recipe
        </Button>
      </HStack>
    </HStack>
  );
};

export default NavBar;
