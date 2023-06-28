import { Box, Button, Text, Heading, useToast, Image } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Verification = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const url = window.location.href.split("/");
    const token = url[url.length - 1];
    const verify = async () => {

        try {
            const res = await axios.patch(
              "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast({
              title: "You're Successfully Registered! Please log in to Your Account",
              status: "success",
              duration: "2000",
              isClosable: true,
            });
            navigate("/");
            console.log(res)

          } catch (err) {
            console.log(err)
            toast({
              title: ("Error: " + err.response.data.err.name),
              status: "error",
              duration: "2000",
              isClosable: true,
            });
          }
        };

    return(
    <>
    <Box minH={'100vh'} pos='relative' display='grid' justifyContent='center' backgroundImage={"https://i.imgur.com/jvfSEBD.jpeg"} backgroundSize={'110%'} w={'full'} h={'full'}>
        <Image      ml={'10'}
                    mt={'20'}
                    inlineSize={'65%'}
                    src='https://i.imgur.com/QoZNb3H.png'>
                    </Image>
        <br/>
        <Heading ml={'10'}>Verify Your Account</Heading>
        <Box>
        <Text fontSize={"md"} mt={10} ml={'20'}>
            Click here to verify your account
          </Text>
        </Box>
          
          <Button
            onClick={() => verify()}
            type="submit"
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            mt={"6"}
            rounded={"lg"}
            color={"white"}
            colorScheme="pink"
            _hover={{ bgColor: "#B75CFF" }}
            _active={{ bgColor: "#6C12B5" }}
          >
            Verify
          </Button>
            </Box>
    </>
    )
}
