import {
    Box,
    Text,
    FormControl,
    FormLabel,
    useDisclosure
  } from "@chakra-ui/react"
  import { ChangePhone } from "./ChangePhone";
  import { useDispatch } from "react-redux";
  import { useEffect, useState } from "react";
  import axios from "axios";

  export default function Phone() {

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
                <FormLabel onClick={onOpen} cursor={'pointer'}>Phone</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{data.phone}</Text>
                <ChangePhone isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>

        </Box>
        </>
      
    )
  }
  