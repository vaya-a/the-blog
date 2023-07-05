import React from "react";
import Fonts from "../component/assets/Fonts";

import { Box, Heading, Image, useToast, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FormLabel, Input, FormErrorMessage, FormControl, Button } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

export const RegistPage = () => {
    const [show1, setShow1] = React.useState(false)
    const handleClick1 = () => setShow1(!show1)

    const [show2, setShow2] = React.useState(false)
    const handleClick2 = () => setShow2(!show2)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const toast = useToast()
    const navigate = useNavigate()
    const toLandingPage = () => {
        navigate("/")
    }

    const register = async () => {
        try{
            const res = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth", {
                username: formik.values.username,
                email: formik.values.email,
                phone: (formik.values.phone),
                password: formik.values.password,
                confirmPassword: formik.values.confirmPassword
        })
        console.log(res)
        console.log(formik.values)
        formik.resetForm();

        toast({
            title: "You're successfully registered! " + res.data.message ,
            status: "success",
            duration: "2000",
            isClosable: true,
          });

        }
        catch(err){
            toast({
                title: "Registration can't be completed: " + err.response.data,
                status: "error",
                duration: "2000",
                isClosable: true,
              })
            console.log(err)
            console.log(err.response.data)  
        }
        
    }
    
    const formik = useFormik({
        // initial values
        initialValues: {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        // validation schema
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Please fill with your desired username").min(5,"Username should be more than 5 characters"),
            email: Yup.string()
                .required("Please fill with your email")
                .email('Invalid email format'),
            phone: Yup.string()
                .required('Please fill with your phone number')
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(8, "Please put a right phone number min 8")
                .max(13, "Please put a right phone number max 13"),
            password: Yup.string()
                .required(`Please enter a password`)
                .min(8, 'Should more than 8 characters')
                .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
                .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
                .matches(/[0-9]/g, 'Should contain at least 1 number')
                .matches(/^\S*$/, 'Should not contain spaces')
                .matches(/[^\w]/, 'Password requires a symbol'),
            confirmPassword: Yup.string()
                .required(`Please enter a password`)
                .oneOf([Yup.ref('password')], `Password doesn't match`),
        }),
        onSubmit: register
    });
    return(
        <>
            <Box pos='relative' display='flex' justifyContent='center' backgroundImage={"https://i.imgur.com/jvfSEBD.jpeg"} backgroundSize={'110%'} w={'full'} h={'full'}>
                <Box as='form' onSubmit={formik.handleSubmit} p='20' justifyContent='center'>
                    <Image
                    ml={'20'}
                    inlineSize={'65%'}
                    src='https://i.imgur.com/QoZNb3H.png'>
                    </Image>
                    <br/>
                    <Heading mb={'10'} color={'black'}>Start Your Beauty Journey with Us!</Heading>
                    <Box>

                    <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                        <FormLabel className="label-required">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                {...formik.getFieldProps('email')}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.email && formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={formik.touched.phone && formik.errors.phone}>
                        <FormLabel mt={'3'} className="label-required">Phone</FormLabel>
                            <Input
                                type="text"
                                name="phone"
                                {...formik.getFieldProps('phone')}
                                onChange={formik.handleChange}
                                mt={'-0.5'}
                            />
                            {formik.touched.phone && formik.errors.phone && <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={formik.touched.username && formik.errors.username}>
                        <FormLabel mt={'3'} className="label-required">Username</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                {...formik.getFieldProps('username')}
                                onChange={formik.handleChange}
                                mt={'-0.5'}
                            />
                            {formik.touched.username && formik.errors.username && <FormErrorMessage>{formik.errors.username}</FormErrorMessage>}
                    </FormControl>
               
                    <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                        <FormLabel mt={'3'} className="label-required">Password</FormLabel>
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
                        <FormLabel mt={'3'} className="label-required">Confirm Password</FormLabel>
                            <InputGroup>
                                <Input  type={show2 ? 'text' : 'password'} {...formik.getFieldProps('confirmPassword')}
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
            <Box display={'grid'} justifyContent={'center'} mt={'5'}>
                <Button colorScheme="pink" onClick={() => {
                    register()
                    }} type="submit" disabled={formik.isSubmitting}
                    isDisabled={formik.values.username === null ||
                    formik.values.email === null ||
                    formik.values.phone === null ||
                    formik.values.password === null ||
                    formik.values.confirmPassword === null}
                    >Register</Button>
                <Button onClick={toLandingPage} colorScheme="grey.200" mt={'5'} variant={'link'}>Back to Home</Button>
            </Box>
                </Box>
                <Fonts/>
            </Box>
        </>
    )
}