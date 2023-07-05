import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Button,
    Divider,
    FormControl,
    FormLabel,
    useDisclosure
  } from "@chakra-ui/react"
  import { useSelector } from "react-redux"
  import { Route, Routes } from "react-router-dom";
  import { LandingPage } from "../LandingPage/LandingPage";
  import { useNavigate } from "react-router-dom";
  import { ChangeUsername } from "./component/ChangeUsername";
  import Email from "./component/Email";
  import Phone from "./component/Phone";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { useDispatch } from "react-redux";
  import { ChangeProfilePicture } from "./component/ChangeProfilePicture";
  import { ChangeEmail } from "./component/ChangeEmail";
import { ProfilePicture } from "./component/ProfilePicture";

  export default function SettingPage() {
    const userLogin = localStorage.getItem("token")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const login = useSelector((state) => state.UserReducer.login)
    const navigte = useNavigate()
    const toLandingPage = () => {
        navigte("/")
    }

    const dispatch = useDispatch()
    const [data, setData] = useState("");
    const token = localStorage.getItem("token");
    const getData = async() => {
      try {
        if (token) {
          const respon = await axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setData(respon.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getData();
    }, []);

    return (
        <>
        <Box>
            {!login && !userLogin ? <>
                <Box>
                    <Routes>
                        <Route path='/' element={<LandingPage/>} />
                    </Routes>
                </Box>
            </>
            : 
            <>
            <Box minH={'100vh'} pos='relative' display='grid' justifyContent='center' backgroundImage={"https://i.imgur.com/jvfSEBD.jpeg"} backgroundSize={'110%'} w={'full'} h={'full'}>
        <Center py={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={("white")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
         <ProfilePicture/>
          
          <Heading size={"lg"} mt={'5'} color={"gray.500"} mb={'6'}>
            Account Information
          </Heading>
        
            <FormControl onClick={onOpen} cursor={'pointer'} textAlign={'left'}>
                <FormLabel cursor={'pointer'} onClick={onOpen}>Username</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{data.username}</Text>
                <ChangeUsername isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>
            <Divider/>
            <Email/>
            <Divider/>
           <Phone/>
            <Divider mt={'2'} mb={10}></Divider>
            <Box display={'flex'} justifyContent={'right'}>
            <Button onClick={toLandingPage} variant={'link'}>Back to Home</Button>
        </Box>
        </Box>
        
      </Center>
        </Box>
            </>}
        </Box>
        
        </>
      
    )
  }
  