import React, {useState} from "react";
import { Box, Flex, FormHelperText, Textarea, FormControl, FormLabel, Input, Select, Heading, Button, Text, Stack } from "@chakra-ui/react";
import { Navbar1 } from "../../../component/Navbar-1";
import { useDropzone } from 'react-dropzone';
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { Footer } from "../../../component/Footer/Footer";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../../LandingPage/LandingPage";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newPost } from "../../../redux/reducer/PostReducer";

export const AnotherWriting = () => {
  //const userLogin = localStorage.getItem("token")
  const login = useSelector((state) => state.UserReducer.login)
  const dispatch = useDispatch()

  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  

  const handleRemoveFile = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = (event) => {
    // Handle the upload logic here
    if (selectedFiles.length > 0) {
      // Upload files
      console.log('Uploading files:', selectedFiles);
      setSelectedFiles(URL.createObjectURL(selectedFiles[0].name));
    }
  };

  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategory(res.data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      country: document.getElementById("country").value,
      CategoryId: selectedOption,
      url: "/",
      keywords: document.getElementById("keywords").value,
    };
    const file = document.getElementById("file").files[0].name;
    dispatch(newPost(data, file));
  };

    return(
        <Box>
            {!login ? 
            <>
            <Routes>
            <Route path='/' element={<LandingPage/>} />
            </Routes>
            </> : 
            <>
            <Navbar1/>
            <Box h={'70%'} margin={'40'} borderWidth="2px" borderColor="pink.300" borderRadius="md" p={4}>
            <Box mt={'20'} display={'flex'} justifyContent={'center'}>
                <Heading>Share Your Beauty Journey</Heading>
            </Box>
            <br/>
            <Box mt={'15'} mr={'20'} ml={'20'}>
            <form onSubmit={handleSubmit}>
            <FormControl mt={'5'}>
                    <FormLabel>Title</FormLabel>
                    <Textarea id="title" minH={'47px'}></Textarea>
                </FormControl>
                <FormControl mt={'-1'}>
                    <FormLabel></FormLabel>
                    <Textarea id="content" placeholder="Tell everything here..." minH={'200px'}></Textarea>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Country</FormLabel>
                    <Textarea id="country" minH={'47px'}></Textarea>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Category</FormLabel>
                    <Select onChange={handleOptionChange} placeholder='Select Category'>
                    {category &&
                      category.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Upload Image</FormLabel>
                    {/* <Flex
        {...getRootProps()}
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="md"
        p={4}
        cursor="pointer"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderColor={isDragActive ? 'teal.500' : 'gray.200'}
        bg={isDragActive ? 'gray.100' : 'white'}
        _hover={{ borderColor: 'teal.500', bg: 'gray.100' }}
      >
        <input {...getInputProps({ multiple: true })} />
        <Text textAlign="center">
          {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Drag and drop image files here'}
        </Text>
      </Flex> */}
      {/* {selectedFiles.length > 0 && (
        <Flex wrap="wrap" mt={4}>
          {selectedFiles.map((file) => (
            <Box key={file.name} position="relative" m={1}>
              <Box
                as="img"
                src={URL.createObjectURL(file)}
                alt={file.name}
                width="100px"
                height="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <Button
                size="sm"
                position="absolute"
                top={2}
                right={2}
                colorScheme="red"
                onClick={() => handleRemoveFile(file)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Flex>
      )} */}
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
                    colorScheme="facebook"
                    mb={"10px"}
                    onChange={handleImageUpload}
                  />
                </Flex>
                {selectedImage && (
                  <Box mb={6} position={"relative"}>
                    <img
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
                <FormControl mt={'5'}>
                    <FormLabel>Keywords</FormLabel>
                    <Input minH={'47px'} id="keyword"></Input>
                </FormControl>
            </form>
            <FormControl >
                
            </FormControl>
            
                <Box mb='10' display={'flex'} justifyContent={'center'} mt={'7'}>
                    <Button colorScheme="pink" type="submit">Submit</Button>
                </Box>
            </Box>
            </Box>
           <Footer/>
            </>}
        </Box>
    )
}
