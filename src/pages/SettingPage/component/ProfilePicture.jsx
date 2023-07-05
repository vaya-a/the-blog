import React, {useState, useEffect} from "react";
import { Box, Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { ChangeProfilePicture } from "./ChangeProfilePicture";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ChangeProfPict } from "./ChangeProfilePict";

export const ProfilePicture = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch()
    const [data, setData] = useState("");
    const getData = async() => {
      const token = localStorage.getItem("token");
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
    return(
        <Box>
            <Avatar
            size={"xl"}
            src={
              data.imgProfile
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
          <Button onClick={onOpen} colorScheme='pink' variant='link'>
                Change Profile Picture
            </Button>
            <ChangeProfPict isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          </Box>
        </Box>
    )
}