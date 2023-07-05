import {
    Box,
    Text,
    FormControl,
    FormLabel,
    useDisclosure
  } from "@chakra-ui/react"
  import { ChangeEmail } from "./ChangeEmail";
  import axios from "axios";
  import { useDispatch } from "react-redux";
  import { useEffect, useState } from "react";

  export default function Email() {

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

    return (
        <>
        <Box>
            <FormControl onClick={onOpen} cursor={'pointer'} mt='2' textAlign={'left'}>
                <FormLabel onClick={onOpen} cursor={'pointer'}>Email</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{data.email}</Text>
                <ChangeEmail isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>

        </Box>
        </>
      
    )
  }
  