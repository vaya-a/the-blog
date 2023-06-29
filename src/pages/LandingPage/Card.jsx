import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Card = ({ data }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
    </Box>
  );
};

export default Card;