import React from "react";
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, FormControl, Input, ModalFooter,
    useDisclosure, FormLabel, useToast, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux";

export const ChangeUsername = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/'); // Navigate back to the previous route
    };
    const token = localStorage.getItem("token")
    const login = useSelector((state) => state.UserReducer.login)
    const { user } = useSelector((state) => state.UserReducer);
    const toast = useToast();
  
    const changeusn = async () => {
        try{
            const res = await axios.patch(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
                {
                    currentUsername: user.username,
                    newUsername: formik.values.username,
                    "FE_URL": "http://localhost:3000"
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast({
                title: "Your username successfully changed. Please check your email to re-verificate your Account!" ,
                status: "success",
                isClosable: true,
              });
              console.log(res)
              console.log(user.token)

        }
        catch(err){
          toast({
            title: `Failed to change username: ` + err.response.data,
            status: "error",
            duration: "2000",
            isClosable: true,
          });
            console.log(err)
            console.log(user.token)
        }
    }

    const formik = useFormik({
        // initial values
        initialValues: {
            username: ''
        },
        // validation schema
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Please fill with your desired username").min(5,"Username should be more than 5 characters"),
        }),
        onSubmit: changeusn
    })

    const resetForm = () => {
        formik.resetForm()
      }
  
    return (
      <>
        <Modal
         Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => {
            handleModalClose()
            resetForm()
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Username</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Current Username</FormLabel>
                <Text>{user.username}</Text>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>New Username</FormLabel>
                <Input placeholder='Input new username'
                type="text"
                name="username"
                {...formik.getFieldProps('username')}
                onChange={formik.handleChange} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={() => {changeusn() 
                formik.resetForm()}} colorScheme='pink' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }