import React from "react";
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, FormControl, Input, ModalFooter,
    FormLabel, useToast, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch} from "react-redux";
import { useState, useEffect } from "react";

export const ChangePhone = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/settings'); // Navigate back to the previous route
    };

    const toast = useToast();
    const token = localStorage.getItem("token");

    const dispatch = useDispatch()
    const [data, setData] = useState("");
    const getData = async() => {
      try {
        if (token) {
          const respon = await axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setData(respon.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getData();
    }, []);
  
    const changephn = async () => {
        try{
            const res = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone", {
                currentPhone: data.currentPhone,
                newPhone: formik.values.newPhone,
                FE_URL: "http://localhost:3000"
        },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
            )
            toast({
                title: "Phone number succesfully changed!" ,
                status: "success",
                duration: "2000",
                isClosable: true,
              });
              console.log(token)
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
                console.log(token)
            }
    }
    
    const phonePattern = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        // initial values
        initialValues: {
           newPhone: '',
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
                <Text>{data.phone}</Text>
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