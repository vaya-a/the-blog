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

  return (
    <Box bgColor={"#E8EDE7"}>
      <Box
        fontFamily={"monospace"}
        // bgColor={""}

        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          mt={"40px"}
          mb={"40px"}
          bgColor={"white"}
          boxShadow={"dark-lg"}
          rounded={"xl"}
          padding={10}
        >
          <Flex display={"flex"} justifyContent={"flex-start"}>
            <Text mr={4} fontSize={"4xl"} mb={4}>
              Create Article
            </Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Flex>
              <Box>
                <Input
                  type="text"
                  id="title"
                  mb={"10px"}
                  border={"1px solid #378BA4"}
                  placeholder={"Input Title"}
                />
                <Box alignSelf={"left"} mb={"20px"}>
                  <Select
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                    value={selectedOption}
                    onChange={handleOptionChange}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <option value="">Select Category</option>
                    {category &&
                      category.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
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
                  <Input
                    type="text"
                    placeholder="Keyword"
                    id="keywords"
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                  />

                  <Input
                    type="text"
                    placeholder="Country of Origin"
                    id="country"
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                  />
                </Box>
              </Box>
            </Flex>
            <Box>
              <Textarea
                placeholder="Input Your News Content"
                height={"300px"}
                w={"820px"}
                mb={"20px"}
                id="content"
                border={"1px solid #378BA4"}
              ></Textarea>
            </Box>
            <Button colorScheme="facebook" type="submit">
              CREATE!
            </Button>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};