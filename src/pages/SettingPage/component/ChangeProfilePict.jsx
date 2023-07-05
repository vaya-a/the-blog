import React from "react";
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, FormControl, Input, ModalFooter,
    FormLabel, useToast, Text, Box, Flex, Image} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import { newProfPict } from "../../../redux/reducer/UserReducer";
import { toast, ToastContainer } from "react-toastify";

export const ChangeProfPict = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handleModalClose = () => {
      onClose();
      navigate('/settings'); // Navigate back to the previous route
    };
    const token = localStorage.getItem("token")
    const toast = useToast();
    const dispatch = useDispatch()

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };

    const newProfPict = (file) => {
      return async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const res = await axios.post(
            `https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded`,{
            formData
          },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res)
    
          toast("Your Profile Picture Changed!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    
          document.location.href = "/settings";
        } catch (error) {
          console.log(error.response);
    
          toast(`Can't Change Profile Picture`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      };
    };

    return (
      <>
        <Modal
         Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => handleModalClose()}
        >
          <ModalOverlay />
          <ModalContent>
            <ToastContainer/>
            <ModalHeader>Change Profile Picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={'5'}>
                    <FormLabel>Upload Image</FormLabel>
                    <Box mr={10}>
                <Flex>
                  {/* <FormLabel display={"flex"} alignItems={"center"}>
                  Image
                </FormLabel> */}
                  <Input
                    border={"1px solid #378BA4"}
                    type="file"
                    id="file"
                    variant={"outline"}
                    colorScheme="pink"
                    mb={"10px"}
                    onChange={handleImageUpload}
                  />
                </Flex>
                {selectedImage && (
                  <Box mb={6} position={"relative"}>
                    <Image
                      src={selectedImage}
                      alt="Image Preview"
                      style={{
                        maxWidth: "332px",
                        maxHeight: "300px",
                        marginTop: "10px",
                      }}
                    />
                  </Box>
                )}
              </Box>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={() => {newProfPict()}} type="submit" colorScheme='pink' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }