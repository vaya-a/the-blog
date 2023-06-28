import React, {
    useState
} from "react"
import{ Box, Flex, Text, HStack, Stack, Image } from "@chakra-ui/react"
import { Navbar1 } from "../../component/Navbar-1"
import { Footer } from "../../component/Footer/Footer"
import { SimpleGrid, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"
import { Heading, Button } from "@chakra-ui/react"
import { PreviewCard } from "../../component/PreviewCard"
import { Route, Routes } from "react-router-dom"
import { LoginModal } from "../../component/Navbar/LoginModal"
import { Slide } from "../../component/Slide"


export const LandingPage = () => {
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
      const slides = [
        {
          img: "https://images.soco.id/873-review-beauty-of-joseon-relief-sun-rice-probiotics-3.jpg.jpeg",
          label: "Review: Beauty of Joseon Relief Sun: Rice + Probiotics",
          description: "Another Sunscreen Holygrail You Should Try!",
        },
        {
          img: "https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/sunscreens.jpg",
          label: "Yang Harus Kamu Ketahui tentang Sunscreen",
          description: "Pentingnya Gunakan Sunscreen untuk Cegah Kerusakan DNA Kulit Akibat Sinar UV.",
        },
        {
          img: "https://media.istockphoto.com/photos/woman-applying-perfume-on-her-wrist-picture-id475049616?k=6&m=475049616&s=170667a&w=0&h=BQljx8xhLujMj_XhbSKdj7AjSr6yl6PCP65sAZQTlx8=",
          label: "Tips Perfume Layering",
          description:
            "Bantu Hasilkan Kombinasi Aroma yang Khas Sesuai Selera!",
        },
        {
          img: "https://www.soco.id/cdn-cgi/image/w=220,format=auto,dpr=1.25/https://images.soco.id/233-Anna-C.jpg.jpg",
          label: "15 Inspirasi Fashion khas Remaja Gen Z",
          description: "Ala Bintang Serial 'XO, Anna Cathcart.",
        },
        {
          img: "https://budgetreport.com/wp-content/uploads/2018/11/nail-polish-min-1200x675.jpg",
          label: "Mana Pilihan Favoritmu?",
          description: "10 Warna Kuteks yang Cocok untuk Semarakkan Musim Panas",
        },
        
      ];
      const [currentSlide, setCurrentSlide] = useState(0);
      const slidesCount = slides.length;
    
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
        <Box mt={'20'}>
            <Box>
            <Navbar1/>
            <Slide/>
            {/* <Flex
            w="full"
            
            _dark={{
              bg: "#3e3e3e",
            }}
            p={10}
            alignItems="center"
            justifyContent="center">
                <Flex w="full" pos="relative" overflow="hidden">
                    <Flex h="400px" w="full" {...carouselStyle}>
                    {slides.map((slide, sid) => (
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
                            src={slide.img}
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
                            <Text fontSize="2xl">{slide.label}</Text>
                            <Text fontSize="lg">{slide.description}</Text>
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
            </Flex> */}
            <Box p={'4'} mt={'5'} mb={'20'}>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                   <PreviewCard/>
                   <PreviewCard/>
                   <PreviewCard/>
                   <PreviewCard/>
                   <PreviewCard/>
                   <PreviewCard/>
                   <PreviewCard/>
                </SimpleGrid>
            </Box>
            <Footer/>
        </Box>
        </Box>
    )
}