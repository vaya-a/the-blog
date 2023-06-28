import React, {useState} from "react";
import { Box, Flex, FormHelperText, Textarea, FormControl, FormLabel, Input, Select, Heading, Button, Text, Stack, useToast } from "@chakra-ui/react";
import { Navbar1 } from "../../component/Navbar-1";
import { useDropzone } from 'react-dropzone';
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { Footer } from "../../component/Footer/Footer";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { useDispatch } from "react-redux";
import { newPost } from "../../redux/reducer/PostReducer";
import { useEffect } from "react";
import axios from "axios";


export const TrialWriting = () => {

  const userLogin = localStorage.getItem("token")
  const login = useSelector((state) => state.UserReducer.login)

  const toast = useToast()
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
  });

  const handleRemoveFile = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = (pic) => {
    // Handle the upload logic here
    if (selectedFiles.length > 0) {
      // Upload files
      console.log('Uploading files:', selectedFiles);
      setSelectedFiles(URL.createObjectURL(selectedFiles))
       
    }
    if (selectedFiles.length > 1){
      toast({
          title: "Sorry, you only able to put one photo",
          status: "error",
          isClosable: true,
      })
    }
  };

  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveKeyword = (index) => {
    const updatedKeywords = [...keywords];
    updatedKeywords.splice(index, 1);
    setKeywords(updatedKeywords);
  };
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
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

  const data = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    country: document.getElementById("country").value,
    CategoryId: selectedOption,
    url: "/",
    keywords: inputValue,
  };
  const file = document.getElementById("file").files[0];
  dispatch(newPost(data, file));
;

    return(
        <Box>
            {!userLogin && !login ? 
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
                    <Select
                    value={selectedOption}
                    onChange={handleOptionChange} 
                    placeholder='Select Category'>
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
                    <Flex
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
      </Flex>
      {selectedFiles.length > 0 && (
        <Flex wrap="wrap" mt={4}>
          {selectedFiles.map((file) => (
            <Box key={file.name} position="relative" m={1}>
              <Box
                id="file"
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
      )}
      <Button colorScheme="teal" mt={4}>
        Upload
      </Button>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Keywords</FormLabel>
                    <Flex align="center" flexWrap="wrap">
      {keywords.map((keyword, index) => (
        <Tag key={index} size="md" borderRadius="md" m={1}>
          <TagLabel>{keyword}</TagLabel>
          <TagCloseButton onClick={() => handleRemoveKeyword(index)} />
        </Tag>
      ))}
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add keywords"
        size="md"
        borderRadius="md"
        mt={1}
        flexShrink={0}
      />
    </Flex>
                </FormControl>
                <Box mb='10' display={'flex'} justifyContent={'center'} mt={'7'}>
                    <Button disabled={selectedFiles.length === 0} onClick={handleUpload} colorScheme="pink" type="submit">Submit</Button>
                </Box>
                
            </Box>
            </Box>
           <Footer/>
            </>}
        </Box>
    )
}
