import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  Text,
  useToast,
  HStack
} from "@chakra-ui/react";
import axios from "axios";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

export default function Content() {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getBlog() {
    try {
      const respon = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=&sort=DESC&size=10"
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
    const totalPages = Math.ceil(blogList.length / 4);
    if (currentPage < totalPages && currentPage < 3) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderArticles = () => {
    return blogList
      .slice((currentPage - 1) * 4, currentPage * 4)
      .map((blog) => (
        <Box
          key={blog.id}
          flex="1"
          mx={2}
          mb={6}
          boxShadow="6px 6px 0 black"
        >
          <Box h="200px" borderBottom="1px" borderColor="black">
            <Img
              src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}
              roundedTop="sm"
              objectFit="cover"
              h="full"
              w="full"
              alt="Blog Image"
            />
          </Box>
          <Box p={4}>
            <Box bg="black" display="inline-block" color="white" mb={2}>
              <Text fontSize="xs" fontWeight="medium">
                {blog.Category.name}
              </Text>
            </Box>
            <Heading color="black" fontSize="2xl" noOfLines={1}>
              {blog.title}
            </Heading>
            <Text color="gray.500" noOfLines={2}>
              {blog.content}
            </Text>
            <Text color="black">Author: {blog.User.username}</Text>
          </Box>
          <HStack borderTop="1px" color="black">
            <Flex
              p={4}
              alignItems="center"
              justifyContent="space-between"
              roundedBottom="sm"
              cursor="pointer"
              w="full"
            >
              <Text fontSize="md" fontWeight="semibold">
                View more
              </Text>
              <BsArrowUpRight />
            </Flex>
            <Flex
              p={4}
              alignItems="center"
              justifyContent="space-between"
              roundedBottom="sm"
              borderLeft="1px"
              cursor="pointer"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <BsHeartFill fill="red" fontSize="24px" />
              ) : (
                <BsHeart fontSize="24px" />
              )}
            </Flex>
          </HStack>
        </Box>
      ));
  };

  return (
    <Flex direction="column" alignItems="center" px={8} py={8} mt={16}>
      <Heading mb={6}>Post You Might be Interested to Read</Heading>
      <Flex justifyContent="center" alignItems="stretch">
        {renderArticles()}
      </Flex>
      <Flex justify="center" mt={6}>
        <Button
          colorScheme="pink"
          borderRadius="80px"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          borderRadius="80px"
          colorScheme="pink"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(blogList.length / 4)}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
