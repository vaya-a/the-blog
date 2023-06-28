import React from "react";
import { FormControl, FormLabel, Input, Box, useToast, Button, FormErrorMessage, Image, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

export const ForgotPassword = () => {
    const toast = useToast();
    const navigate = useNavigate()
    const toLandingPage = () => {
        navigate("/")
    }
    
    const forgot = async () => {

            try{
                const res = await axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", {
                    email: formik.values.email
            }
                )
                toast({
                    title: "Please check your email to reset your Password!" ,
                    status: "success",
                    duration: "500",
                    isClosable: true,
                  });
                  
                  console.log(res)
                  navigate("/")
            }

                catch(err){
                    toast({
                        title: `Failed to login: ` + err.response.data.err  ,
                        status: "error",
                        duration: "500",
                        isClosable: true,
                      });
                    console.log(err)
                }
        }

        const formik = useFormik({
            // initial values
            initialValues: {
                email: '',
                password: '',
            },
            // validation schema
            validationSchema: Yup.object({
                email: Yup.string()
                    .required()
                    .email('Invalid email format'),
               }),
            // handle submission
            onSubmit: forgot
        });
    return(
    <> 
        <Box minH={'100vh'} display='flex' justifyContent='center' bgSize={'cover'} backgroundImage={"https://i.imgur.com/jvfSEBD.jpeg"}>
        <Box>
        <Image      ml={'10'}
                    mt={'20'}
                    inlineSize={'65%'}
                    src='https://i.imgur.com/QoZNb3H.png'>
                    </Image>
        <Heading ml={'10'}>Reset Your Password</Heading>
        <Box as='form' onSubmit={formik.handleSubmit} p='20' justifyContent='center'>
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel ml={'-5'}>Enter Your Email to Reset Your Password</FormLabel>
                <Input
                ml={'-5'}
                type="email"
                name="email"
                {...formik.getFieldProps('email')}
                onChange={formik.handleChange}>
                </Input>
                {formik.touched.email && formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
            </FormControl>
            <Box display={'grid'} justifyContent={'center'} ml={'-10'} mt={'5'}>
            <Button colorScheme="pink" mt={'3'} type="submit" onClick={() => {forgot()}}>Submit</Button>
            <Button onClick={toLandingPage} colorScheme="grey.200" mt={'5'} variant={'link'}>Back to Home</Button>
            </Box>
        </Box>
    </Box>
    </Box>
    </>
    )
}
