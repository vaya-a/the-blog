import React from "react";
import { Box, Button, Heading, Input, Text, useColorModeValue } from '@chakra-ui/react';

export const FooterSignUp = () => {
    
    return(
        <>
        <Heading fontSize="24px" mb="15px" className="yellow-gradient-color">
          Want more?
        </Heading>
        <Text color="gray.400" mb="15px">
          Get Our Daily Dose of Beauty & Life Style
        </Text>
  
        <form action="#">
          <Box position="relative">
            <Input
              type="email"
              isRequired
              name="entry.1808449400"
              px="25px"
              height="50px"
              rounded="50px"
              border={"3px"}
              borderColor={"pink.200"}
              bg={useColorModeValue('white.100', 'pink.400')}
              _placeholder={{ color: 'pink.600' }}
              placeholder="Enter your email"
              _focus={{ outline: 0 }}
              color="cyan.700"
              borderWidth={0}
            />
            <Button
              type="submit"
              height="50px"
              color="gray.100"
              _hover={{ bg: 'pink.400', color: 'grey.300' }}
              position="absolute"
              top="0"
              right="0"
              bg="pink.700"
              rounded="50px"
              px="25px"
            >
              Subscribe
            </Button>
          </Box>
        </form>
      </>
    )   
}