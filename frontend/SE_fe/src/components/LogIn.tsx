/*


import React, { useState, FormEvent } from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Box,
  VStack,
} from "@chakra-ui/react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const toast = useToast();

  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email && password) {
      toast({
        title: "Login successful.",
        description: "You've logged in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: "Email and password are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRegisterSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username && regEmail && regPassword) {
      toast({
        title: "Registration successful.",
        description: "Your account has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: "All fields are required to register.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8}>
      <Flex
        as="form"
        onSubmit={handleLoginSubmit}
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
        mt={0}
      >
        <FormControl id="email" isRequired mr={2} width="25%">
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="sm"
          />
        </FormControl>
        <FormControl id="password" isRequired mr={2} width="25%">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="sm"
          />
        </FormControl>
        <Button type="submit" colorScheme="blackAlpha" color="white" bg="black">
          Log In
        </Button>
      </Flex>

      <Box as="form" onSubmit={handleRegisterSubmit} width="100%">
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default LoginForm;
*/

import React, { useState, FormEvent } from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Box,
  Collapse,
} from "@chakra-ui/react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const toast = useToast();

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (username && password) {
      const userData = {
        username: username,
        password: password,
      };
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          // Recipe added successfully, you can redirect or show a success message
          console.log('Login successful');
          toast({
            title: "Login successful.",
            description: "You've logged in successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // Handle error response
          console.error('Login failed');
        }
      } catch (error) {
        // Handle network error
        console.error('Network error:', error);
      }
    } else {
      toast({
        title: "Error.",
        description: "Email and password are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (username && regEmail && regPassword) {
      const userData = {
        username: username,
        password: regPassword,
        email: regEmail
      };
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          // Recipe added successfully, you can redirect or show a success message
          console.log('Registration successful');
          toast({
            title: "Registration successful.",
            description: "Your account has been created.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // Handle error response
          console.error('Registration failed');
        }
      } catch (error) {
        // Handle network error
        console.error('Network error:', error);
      }

    } else {
      toast({
        title: "Error.",
        description: "All fields are required to register.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <VStack spacing={8}>
      <Flex
        as="form"
        onSubmit={handleLoginSubmit}
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
        mt={0}
      >
        <FormControl id="username" isRequired mr={2} width="25%">
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="sm"
          />
        </FormControl>
        <FormControl id="password" isRequired mr={2} width="25%">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="sm"
          />
        </FormControl>
        <Button type="submit" colorScheme="blackAlpha" color="white" bg="black">
          Log In
        </Button>
        <Button onClick={toggleRegistration} ml="4" colorScheme="blue">
          Create Account
        </Button>
      </Flex>

      <Collapse in={showRegistration}>
        <Box as="form" onSubmit={handleRegisterSubmit} width="100%">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Register
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default LoginForm;
