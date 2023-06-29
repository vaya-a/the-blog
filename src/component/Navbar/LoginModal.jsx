import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Input,
    Image,
    InputGroup,
    InputRightElement,
    useToast,
    FormErrorMessage,
    Box
  } from "@chakra-ui/react";
  import React from "react";
  import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from 'react-redux';
  import { userLogin, setUser} from "../../redux/reducer/UserReducer";
  import axios from "axios";
  import { useFormik } from "formik";
  import * as Yup from "yup"

  export const LoginModal = ({ isOpen, onClose }) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/'); // Navigate back to the previous route
    };
    const toast = useToast();
    const dispatch = useDispatch()
    const toForgotPassword = () => {
        navigate("/forgot-password")
      }

    const login = async () => {
        const value = formik.values.theinput
        const usernamePattern = /^[a-zA-Z0-9_.-]+$/;
        const phonePattern = /^\d+$/;
        const emailPattern = /^[\w.-]+@[\w.-]+\.\w+$/;

        if(phonePattern.test(value)){
            try{
                const res = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
                    phone: value,
                    password: formik.values.password,
            }
                )
                toast({
                    title: "Welcome to Your Beauty Journey!" ,
                    status: "success",
                    isClosable: true,
                  });

                  dispatch(userLogin(res.data.token));
                  dispatch(setUser(res.data.isAccountExist))
                  //localStorage.setItem("token", res.data.token)

                  console.log(res)
                  navigate("/")
                  handleModalClose()
            }

                catch(err){
                    toast({
                        title: `Failed to login: ` + err.response.data.err  ,
                        status: "error",
                        isClosable: true,
                      });
                    console.log(err)
                    console.log(`${value} phone`)
                }
        }
        else if(emailPattern.test(value)){
            try{
                const res = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
                    email: value,
                    password: formik.values.password,
            }
                )

                toast({
                    title: "Welcome to Your Beauty Journey!" ,
                    status: "success",
                    isClosable: true,
                  });

                  dispatch(userLogin(res.data.token));
                  dispatch(setUser(res.data.isAccountExist))
                  localStorage.setItem("token", res.data.token)
                  console.log(res)
                  navigate("/")
                  handleModalClose()
            }

                catch(err){
                    toast({
                        title: `Failed to login: ` + err.response.data.err  ,
                        status: "error",
                        duration: "2000",
                        isClosable: true,
                      });

                    console.log(err)
                    console.log(`${value} email`)
                }
        }

        else if (usernamePattern.test(value)){
            try{
                const res = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
                   username: value,
                    password: formik.values.password,
            }
                )
                toast({
                    title: "Welcome to Your Beauty Journey!" ,
                    status: "success",
                    duration: "2000",
                    isClosable: true,
                  });
                  dispatch(userLogin(res.data.token));
                  dispatch(setUser(res.data.isAccountExist))
                  localStorage.setItem("token", res.data.token)

                  console.log(res)
                  navigate("/")
                  handleModalClose()
            }

                catch(err){
                    toast({
                        title: `Failed to login: ` + err.response.data.err  ,
                        status: "error",
                        duration: "2000",
                        isClosable: true,
                      });
                    console.log(err)
                    console.log(`${value} username`)
                    
                }
        }
        
    }
    const formik = useFormik({
        // initial values
        initialValues: {
            theinput: '',
            password: '',
        },
        // validation schema
        validationSchema: Yup.object({
            theinput: Yup.string().required("Please input username or email or phone number"),
            username: Yup.string()
                .required(),
            email: Yup.string()
                .required()
                .email('Invalid email format'),
            phone: Yup.number()
                .required(),
            password: Yup.string()
                .required("Please input a password")
                .min(8, 'Should more than 8 characters')
                .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
                .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
                .matches(/[0-9]/g, 'Should contain at least 1 number')
                .matches(/^\S*$/, 'Should not contain spaces')
                .matches(/[^\w]/, 'Password requires a symbol'),
        }),
        // handle submission
        onSubmit: login})
    const resetForm = () => {
      formik.resetForm()
    }
    return (
      <>
        <Modal  closeOnOverlayClick={false} isOpen={isOpen} onClose={() => {
          handleModalClose()
          resetForm()
        }}>
          <ModalOverlay />
          <ModalContent as='form' onSubmit={formik.handleSubmit}>
            <ModalHeader ml={'20'} mt={'10'} alignItems={'center'}>
            <Image 
                inlineSize={'65%'}
                src='https://i.imgur.com/QoZNb3H.png'>
            </Image>
            <br>
            </br>
                Enter Your Beauty Journey</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={formik.touched.theinput && formik.errors.theinput}>
                <FormLabel>Username or Email or Password</FormLabel>
                  <Input type="text"
                        name="theinput"
                        {...formik.getFieldProps('theinput')}
                        onChange={formik.handleChange} />
                        {formik.touched.theinput && formik.errors.theinput && <FormErrorMessage>{formik.errors.theinput}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input type={show ? 'text' : 'password'} name="password"
                        {...formik.getFieldProps('password')}
                        onChange={formik.handleChange}/>
                <InputRightElement width='4.5rem'>
                <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick}>
                {show ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                </Button>
                </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
                </FormControl>
            </ModalBody>
            <ModalFooter display={"grid"}>
              <Button onClick={login} type="submit" 
               colorScheme="pink" mr={3}
               isDisabled={ formik.values.theinput === null ||
                formik.values.password === null}
              >
                Login
              </Button>
              <Button onClick={() => 
                    {toForgotPassword()}} variant={'link'} type="submit" disabled={formik.isSubmitting} mt={'2'}>Forgot Password?</Button>
              <Box>
                </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };