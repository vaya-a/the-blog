import React, {
    useState
} from "react"
import{ Box, Flex, Text, HStack, Stack, Image, Highlight } from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";


export const Slide = () => {

  const [like, setLike] = useState([]);
  const topLike = async () => {
    try {
      const respon = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?size=10&sort=DESC&orderBy=total_fav"
      );
      setLike(respon.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    topLike();
  }, []);

  const dispatch = useDispatch()

  const arrowStyles = {
      cursor: "pointer",
      pos: "absolute",
      top: "50%",
      w: "auto",
      mt: "-22px",
      p: "16px",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
      transition: "0.6s ease",
      borderRadius: "0 3px 3px 0",
      userSelect: "none",
      _hover: {
        opacity: 0.8,
        bg: "black",
      },
    };


    const [currentSlide, setCurrentSlide] = useState(0);
      const slidesCount = 10;
    
      const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
      };
    
      const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
      };
    
      const setSlide = (slide) => {
        setCurrentSlide(slide);
      };
    
      const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
      }

      return(
        <Box>
          <Flex
            w="full"
            
            _dark={{
              bg: "#3e3e3e",
            }}
            p={10}
            alignItems="center"
            justifyContent="center">
                <Flex w="full" pos="relative" overflow="hidden">
                    <Flex h="400px" w="full" {...carouselStyle}>
                    {like.map((slide, sid) => (
                        <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
                        <Text
                            color="white"
                            fontSize="xs"
                            p="8px 12px"
                            pos="absolute"
                            top="0"
                        >
                            {sid + 1} / {slidesCount}
                        </Text>
                        <Image
                            src={`https://minpro-blog.purwadhikabootcamp.com/${slide.imageURL}`}
                            alt="carousel image"
                            boxSize="full"
                            backgroundSize="cover"
                        />
                        <Stack
                            p="8px 12px"
                            pos="absolute"
                            bottom="24px"
                            textAlign="center"
                            w="full"
                            mb="8"
                            color="black" 
                        >
                          <Box justifyContent={'center'} display={'flex'}>
                              <Box w={'60%'} h={'35%'} bg={"rgba(255, 255, 255, 0.7)"} >
                                <Text fontSize="2xl">{slide.title}</Text>
                                <Text fontSize="lg">{slide.User.username}</Text>
                              </Box>
                          </Box>
                        </Stack>
                        </Box>
                    ))}
                    </Flex>
                    <Text {...arrowStyles} left="0" onClick={prevSlide}>
                    &#10094;
                    </Text>
                    <Text {...arrowStyles} right="0" onClick={nextSlide}>
                    &#10095;
                    </Text>
                    <HStack justify="center" pos="absolute" bottom="8px" w="full">
                    {Array.from({
                        length: slidesCount,
                    }).map((_, slide) => (
                        <Box
                        key={`dots-${slide}`}
                        cursor="pointer"
                        boxSize={["7px", null, "15px"]}
                        m="0 2px"
                        bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
                        rounded="50%"
                        display="inline-block"
                        transition="background-color 0.6s ease"
                        _hover={{
                            bg: "blackAlpha.800",
                        }}
                        onClick={() => setSlide(slide)}
                        ></Box>
                    ))}
                    </HStack>
                </Flex>
            </Flex>
        </Box>
      )
}


