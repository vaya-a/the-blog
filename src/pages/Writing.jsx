import React, {useState} from "react";
import { Box, Flex, Textarea, FormControl, FormLabel, Input, Select, Heading, Button, Image } from "@chakra-ui/react";
import { Navbar1 } from "../component/Navbar/Navbar";
import { Footer } from "../component/Footer/Footer";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import { newPost } from "../redux/reducer/PostReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";


export const Writing = () => {
  const userLogin = localStorage.getItem("token")
  const login = useSelector((state) => state.UserReducer.login)

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const [category, setCategory] = useState([]);

  const getCategory = async () => {
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
    getCategory();
  }, []);

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
    const file = document.getElementById("file").files[0];
    dispatch(newPost(data, file));
  };

    return(
        <Box>
            {!login && !userLogin ? 
            <>
            <Routes>
            <Route path='/' element={<LandingPage/>} />
            </Routes>
            </> : 
            <>
            <Navbar1/>
            <Box h={'70%'} margin={'40'} borderWidth="2px" borderColor="pink.300" borderRadius="md" p={4}>
            <Box mt={'20'} display={'flex'} justifyContent={'center'}>
            <ToastContainer/>
                <Heading>Share Your Beauty Journey</Heading>
            </Box>
            <br/>
            <form onSubmit={handleSubmit}>
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
                    <FormLabel>Country Origin</FormLabel>
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
                <FormControl mt={'5'}>
                    <FormLabel>Keywords</FormLabel>
                    <Input
                    type="text"
                    placeholder="Keyword"
                    id="keywords"
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                  />
                </FormControl>
                <Box mb='10' display={'flex'} justifyContent={'center'} mt={'7'}>
                    <Button colorScheme="pink" type="submit">Submit</Button>
                </Box>
            </Box>
            </form>
            </Box>
           <Footer/>
            </>}
        </Box>
    )
}
