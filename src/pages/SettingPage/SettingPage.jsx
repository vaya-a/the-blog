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
  import { ChangePhone } from "./component/ChangePhone";

  export default function SettingPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useSelector((state) => state.UserReducer);
    //const userLogin = localStorage.getItem("token")
    const login = useSelector((state) => state.UserReducer.login)
    const navigte = useNavigate()
    const toLandingPage = () => {
        navigte("/")
    }

    return (
        <>
        <Box>
            {!login ? <>
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
          <Avatar
            size={"xl"}
            src={
              user.imgProfile
            }
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3
            }}
          />
          <Box mt={"-3"} mb={'3'}>
          <Button color={"pink.500"} variant={"link"}>Change profile picture</Button>
          </Box>
          <Heading size={"lg"} mt={'5'} color={"gray.500"} mb={'6'}>
            Account Information
          </Heading>
        
            <FormControl onClick={onOpen} cursor={'pointer'} textAlign={'left'}>
                <FormLabel cursor={'pointer'} onClick={onOpen}>Username</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{user.username}</Text>
                <ChangeUsername isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>
            <Divider/>
            <FormControl mt='2' textAlign={'left'}>
                <FormLabel>Email</FormLabel>
                <Text>{user.email}</Text>
            </FormControl>
            <Divider/>
            <FormControl onClick={onOpen} cursor={'pointer'} mt='2' textAlign={'left'}>
                <FormLabel onClick={onOpen} cursor={'pointer'}>Phone</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{user.phone}</Text>
                {/* <ChangePhone isOpen={isOpen} onClose={onClose} onOpen={onOpen}/> */}
            </FormControl>
            <Divider/>
            <FormControl cursor={'pointer'} mt='3' textAlign={'left'}>
                <Text>Change Password</Text>
            </FormControl>
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
  