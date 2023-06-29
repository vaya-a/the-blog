import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  Img,
  useColorModeValue,
  HStack
} from "@chakra-ui/react";
import { GrLike } from "react-icons/gr";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs"

export default function Content() {
const [liked, setLiked] = useState(false)
  const toast = useToast();
 
  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  async function getBlog(page = 3) {
    try {
      const respon = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?&sort=ASC&per_page=100&page=${page}`
      );
      setBlogList(respon.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlog();
  }, []);

  const handleNextPage = () => {
    const totalPages = Math.ceil(blogList.length / 2);
    if(currentPage < totalPages && currentPage < 3){
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if(currentPage > 1){
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderArticleIndex = (index) => {
    return (
      <Button
        key={index}
        onClick={() => setCurrentPage(index)}
        colorScheme={currentPage === index ? "pink" : "gray"}
        mx={1}
        size={"sm"}
      >
        {index}
      </Button>
    );
  };

  const renderArticleIndexex = () => {
    const totalPages = Math.ceil(blogList.length / 3);
    console.log(totalPages);
    const indexes = [];
    for (let i = 1; i <= totalPages; i++) {
      indexes.push(renderArticleIndex(i));
    }
    return indexes;
  };
  // getBlog();
  return (
    <>
      <Box px={0} py={0} ml={"40px"} mt={"100px"}>
        <Heading>All Post is Here</Heading>
        <Swiper slidesPerView={4}>
          <Flex wrap={"wrap"} gap={"20px"}>
            {blogList
              .slice((currentPage - 1) * 4, currentPage * 4)
              .map((blog) => (
                <SwiperSlide key={blog.id}>
                    
                    <Center py={6}>
    <Box
      w="xs"
      rounded={"sm"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
      borderColor="black"
      boxShadow={("6px 6px 0 black")}
    >
      <Box h={"200px"} borderBottom={"1px"} borderColor="black">
        <Img
          src={
            `https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`
          }
          roundedTop={"sm"}
          objectFit="cover"
          h="full"
          w="full"
          alt={"Blog Image"}
        />
      </Box>
      <Box p={4}>
        <Box
          bg="black"
          display={"inline-block"}
          color="white"
          mb={2}
        >
          <Text fontSize={"xs"} fontWeight="medium">
            {blog.Category.name}
          </Text>
        </Box>
        <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
          {blog.title}
        </Heading>
        <Text color={"gray.500"} noOfLines={2}>
          {blog.content}
        </Text>
        <Text color="black" >Author: {blog.User.username} </Text>
      </Box>
      <HStack borderTop={"1px"} color="black">
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          w="full"
        >
          <Text fontSize={"md"} fontWeight={"semibold"}>
            View more
          </Text>
          <BsArrowUpRight />
        </Flex>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          borderLeft={"1px"}
          cursor="pointer"
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <BsHeartFill fill="red" fontSize={"24px"} />
          ) : (
            <BsHeart fontSize={"24px"} />
          )}
        </Flex>
      </HStack>
    </Box>
  </Center>
                </SwiperSlide>
              ))}
          </Flex>
        </Swiper>
        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            colorScheme="pink"
            borderRadius={'80px'}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {renderArticleIndexex()}
          <Button
          borderRadius={'80px'}
            colorScheme="pink"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(currentPage.length / 3)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}