import React from "react";
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, FormControl, Input, ModalFooter,
    useDisclosure, FormLabel, useToast, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux";

export const ChangeEmail = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/settings'); // Navigate back to the previous route
    };
    //const token = localStorage.getItem("token")
    const login = useSelector((state) => state.UserReducer.login)
    const { user } = useSelector((state) => state.UserReducer);
    const toast = useToast();
  
    const changemail = async () => {
        try{
            const res = await axios.patch(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
                {
                    currentEmail: user.email,
                    newEmail: formik.values.newEmail,
                    "FE_URL": "http://localhost:3000"
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
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
            title: `Failed to change email: ` + err.response.data.err.name,
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
            newEmail: ''
        },
        // validation schema
        validationSchema: Yup.object({
            newEmail: Yup.string()
                .required("Please fill with your desired username").min(5,"Username should be more than 5 characters"),
        }),
        onSubmit: changemail
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
            <ModalHeader>Change Email</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Current Email</FormLabel>
                <Text>{user.email}</Text>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>New Username</FormLabel>
                <Input placeholder='Input new email'
                type="email"
                name="email"
                {...formik.getFieldProps('newEmail')}
                onChange={formik.handleChange} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={changemail} colorScheme='pink' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }