import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import { Card, Image,Stack, CardBody, CardFooter, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";


export const AllPost = () => {

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

  const [article, setArticle] = useState([]);
  const getArticle = async () => {
    try{
        const res = await axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=ASC&page=1&size=8"
          );
          setArticle(res.data.result);
          console.log(res.data.result)
    }
    catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    getArticle();
  }, []);

  const [articles, setArticles] = useState([]);
  const getArticles = async () => {
    try{
        const res = await axios.get(
            `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedOption}&sort=ASC&page=1&size=8`
          );
          setArticles(res.data.result);
          console.log(res.data.result)
          console.log(selectedOption)
    }
    catch(err){
        console.log(err)
    }
  }

 
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.getAttribute("data-value");
    setSelectedOption(value);
  };

  useEffect(() => {
    getArticles();
  }, [selectedOption]);

    return(
        <Box>
            <Box ml={"5"}>
                <Heading>Read Articles by Categories</Heading>
            </Box>
            
            <br/>
            <Tabs colorScheme="cyan">
                <TabList>
                    <Tab>All Categories</Tab>
                    {category &&
                      category.map((item) => (
                    <Tab onClick={handleOptionChange} data-value={item.id} key={item.id} value={item.id}>
                        {item.name}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box>
                        {article.map((artc) => (
                            <Card mt={"5"} mb={"5"}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                                >
                                <Image
                                    objectFit='cover'
                                    maxW={{ base: '100%', sm: '200px' }}
                                    src= {`https://minpro-blog.purwadhikabootcamp.com/${artc.imageURL}`}
                                    alt='Caffe Latte'
                                />

                                <Stack>
                                    <CardBody>
                                    <Heading size='md'>{artc.title}</Heading>
                                    <br/>
                                    <Text>Author: {artc.User.username}</Text>
                                    <Text>Date posted: {artc.createdAt} </Text>
                                    <Text>Category: {artc.Category.name} </Text>

                                        
                                    <Text py='2'>
                                        {artc.content}
                                    </Text>
                                    </CardBody>

                                    <CardFooter>
                                    <Button variant='solid' colorScheme='pink'>
                                        Read More
                                    </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        ))}
                        </Box>
                    </TabPanel >
                    {category &&
                      category.map((item) => (
                        <TabPanel>
                        {articles.map((all) => (<Box>
                            <Card mt={"5"} mb={"5"}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                                >
                                <Image
                                    objectFit='cover'
                                    maxW={{ base: '100%', sm: '200px' }}
                                    src= {`https://minpro-blog.purwadhikabootcamp.com/${all.imageURL}`}
                                    alt='Caffe Latte'
                                />

                                <Stack>
                                    <CardBody>
                                    <Heading size='md'>{all.title}</Heading>
                                    <br/>
                                    <Text>Author: {all.User.username}</Text>
                                    <Text>Date posted: {all.createdAt} </Text>
                                    <Text>Category: {all.Category.name} </Text>

                                        
                                    <Text py='2'>
                                        {all.content}
                                    </Text>
                                    </CardBody>

                                    <CardFooter>
                                    <Button variant='solid' colorScheme='pink'>
                                        Read More
                                    </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        </Box>))}
                      </TabPanel>
                      ))}
                </TabPanels>
            </Tabs>
        </Box>
    )
}