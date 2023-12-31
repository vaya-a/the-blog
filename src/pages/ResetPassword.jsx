import React from "react";
import { FormControl, FormLabel, Input, Box, useToast, Button, FormErrorMessage, Image, Heading } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

export const ResetPassword = () => {
    const [show1, setShow1] = React.useState(false)
    const handleClick1 = () => setShow1(!show1)

    const [show2, setShow2] = React.useState(false)
    const handleClick2 = () => setShow2(!show2)

    const toast = useToast()
    const navigate = useNavigate()
    const url = window.location.href.split("/");
    const token = url[url.length - 1];
    const reset = async () => {

        try{
            const res = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass", {
                password: formik.values.password,
                confirmPassword: formik.values.confirmPassword
        },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
            )
            toast({
                title: "Your password succesfully changed! Please try to login to your account." ,
                status: "success",
                duration: "2000",
                isClosable: true,
              });
              
              console.log(res)
              navigate("/")
        }

            catch(err){
                toast({
                    title: `Failed to change password: ` + err.response.data.err  ,
                    status: "error",
                    duration: "2000",
                    isClosable: true,
                  });
                console.log(err)
            }
    }

    const formik = useFormik({
        // initial values
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        // validation schema
        validationSchema: Yup.object({
            password: Yup.string()
                .required()
                .min(8, 'Should more than 8 characters')
                .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
                .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
                .matches(/[0-9]/g, 'Should contain at least 1 number')
                .matches(/^\S*$/, 'Should not contain spaces')
                .matches(/[^\w]/, 'Password requires a symbol'),
            confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref('password')], 'Password must match')
           }),
        // handle submission
        onSubmit: reset
    });
    return(
    <Box minH={'100vh'} pos='relative' display='grid' justifyContent='center' backgroundImage={"https://i.imgur.com/jvfSEBD.jpeg"} backgroundSize={'110%'} w={'full'} h={'full'}>
    <Box>
        <Image      ml={'10'}
                    mt={'20'}
                    inlineSize={'65%'}
                    src='https://i.imgur.com/QoZNb3H.png'>
                    </Image>
        <Heading ml={'10'}>Change Your Password</Heading>
        <br/>
        <br/>
        <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                    <FormLabel>Enter a new password</FormLabel>
                    <InputGroup>
                      <Input type={show1 ? 'text' : 'password'} name="password"
                              {...formik.getFieldProps('password')}
                              onChange={formik.handleChange}/>
                      <InputRightElement width='4.5rem'>
                        <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick1}>
                        {show1 ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input type={show2 ? 'text' : 'password'} name="confirmPassword"
                            {...formik.getFieldProps('confirmPassword')}
                            onChange={formik.handleChange}/>
                            <InputRightElement width='4.5rem'>
                                <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick2}>
                                {show2 ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                                </Button>
                        </InputRightElement>
                        </InputGroup>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>}
                </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
                <Button
                onClick={() => 
                    {reset()}} colorScheme="pink" type="submit" disabled={formik.isSubmitting} mt={'5'}
                >Change Password</Button>
            </Box>
    </Box>
    )
}
