import React, {useState} from "react";
import { Box, Flex, FormHelperText, Textarea, FormControl, FormLabel, Input, Select, Heading, Button, Text, Stack } from "@chakra-ui/react";
import { Navbar1 } from "../../component/Navbar-1";
import { useDropzone } from 'react-dropzone';
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { Footer } from "../../component/Footer/Footer";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";


export const WritingPage = () => {
  const userLogin = localStorage.getItem("token")
  const login = useSelector((state) => state.UserReducer.login)

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

  const handleUpload = () => {
    // Handle the upload logic here
    if (selectedFiles.length > 0) {
      // Upload files
      console.log('Uploading files:', selectedFiles);
    }
  };

  const [videoUrl, setVideoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleUploads = () => {
    // Validate the video URL
    if (!videoUrl) {
      setErrorMessage('Please enter a video URL.');
      return;
    }

    // Handle the upload logic here
    // You can use the videoUrl state for further processing
    console.log('Uploading video:', videoUrl);

    // Reset the form
    setVideoUrl('');
    setErrorMessage('');
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
                    <FormLabel>Author</FormLabel>
                    <Textarea minH={'47px'}></Textarea>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Title</FormLabel>
                    <Textarea minH={'47px'}></Textarea>
                </FormControl>
                <FormControl mt={'-1'}>
                    <FormLabel></FormLabel>
                    <Textarea placeholder="Tell everything here..." minH={'200px'}></Textarea>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select Category'>
                        <option value='lifestyle'>Lifestyle</option>
                        <option value='beauty'>Beauty</option>
                        <option value='fashion'>Fashion</option>
                        <option value='review'>Product Review</option>
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
      <Button colorScheme="teal" mt={4} disabled={selectedFiles.length === 0} onClick={handleUpload}>
        Upload
      </Button>
                </FormControl>
                <FormControl mt={'5'}>
                    <FormLabel>Upload Video</FormLabel>
                    <Stack spacing={4}>
        <FormControl isInvalid={!!errorMessage}>
          <Input
            value={videoUrl}
            onChange={handleVideoUrlChange}
            placeholder="Enter video URL"
            variant="filled"
            size="md"
          />
          {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
        </FormControl>
        <Button colorScheme="teal" onClick={handleUploads}>
          Upload
        </Button>
      </Stack>
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
                    <Button colorScheme="pink" type="submit">Submit</Button>
                </Box>
                
            </Box>
            </Box>
           <Footer/>
            </>}
        </Box>
    )
}
