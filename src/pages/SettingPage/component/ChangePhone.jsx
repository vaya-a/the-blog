import React from "react";
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, FormControl, Input, ModalFooter,
    useDisclosure, FormLabel, useToast, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux";

export const ChangePhone = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/settings'); // Navigate back to the previous route
    };
    //const token = localStorage.getItem("token")
    const login = useSelector((state) => state.UserReducer.login)
    const { user } = useSelector((state) => state.UserReducer);
    const toast = useToast();
  
    const changephn = async () => {
        try{
            const res = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone", {
                currentPhone: user.currentPhone,
                newPhone: formik.values.newPhone,
                FE_URL: "http://localhost:3000"
        },
        {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
            )
            toast({
                title: "Phone number succesfully changed!" ,
                status: "success",
                duration: "2000",
                isClosable: true,
              });
              console.log(user.token)
              console.log(res)
              navigate("/")
        }

            catch(err){
                toast({
                    title: `Failed to change phone number: ` + err.response.data.err  ,
                    status: "error",
                    duration: "2000",
                    isClosable: true,
                  });
                console.log(err)
                console.log(user.token)
            }
    }
    
    const phonePattern = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        // initial values
        initialValues: {
           newUsername: '',
        },
        // validation schema
        validationSchema: Yup.object({
            phone: Yup.string()
            .required()
            .matches(phonePattern)
           }),
        // handle submission
        onSubmit: changephn
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
            <ModalHeader>Change Phone Number</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Current Phone Number</FormLabel>
                <Text>{user.phone}</Text>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>New Phone</FormLabel>
                <Input placeholder='Input new phone number'
                type="number"
                name="newPhone"
                {...formik.getFieldProps('newPhone')}
                onChange={formik.handleChange} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={changephn} colorScheme='pink' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }