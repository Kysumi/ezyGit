import React from 'react';
import { Flex, Heading, Box } from '@chakra-ui/core';

export const AppBar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="brand.900"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          EzyGit
        </Heading>
      </Flex>

      <Box
        display={{ md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        flexGrow={1}
      >
        Current Branch:
      </Box>
    </Flex>
  );
};
