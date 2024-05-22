import React from "react";
import { Box, Heading, VStack, SimpleGrid, Text } from "@chakra-ui/react";

// This interface would typically be fetched from your backend
interface UserProfile {
  username: string;
  dateJoined: string;
  numberOfRecipes: number;
}

const ProfilePage: React.FC = () => {
  const userProfile: UserProfile = {
    username: "UserNAme",
    dateJoined: "Date Date Date",
    numberOfRecipes: 5,
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1">Hi, {userProfile.username}</Heading>

      <Box w="full">
        <Heading as="h2" size="lg" mb={4}>
          My Recipes
        </Heading>
        {/* This would dynamically list recipes. For now, it's static. */}
        <Text as="a" href="#" textDecoration="underline">
          Chocolate Cake
        </Text>
        <Text as="a" href="#" textDecoration="underline" display="block" mt={2}>
          Apple Pie
        </Text>
      </Box>

      <Box w="full">
        <Heading as="h2" size="lg" mb={4}>
          My Information
        </Heading>
        <SimpleGrid columns={2} spacing={10}>
          <Text fontWeight="bold">Username:</Text>
          <Text>{userProfile.username}</Text>
          <Text fontWeight="bold">Date Joined:</Text>
          <Text>{userProfile.dateJoined}</Text>
          <Text fontWeight="bold">Number of Recipes Uploaded:</Text>
          <Text>{userProfile.numberOfRecipes}</Text>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default ProfilePage;
