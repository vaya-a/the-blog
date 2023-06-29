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
  import { ChangePhone } from "./ChangePhone";

  export default function Phone() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useSelector((state) => state.UserReducer)

    return (
        <>
        <Box>
            <FormControl onClick={onOpen} cursor={'pointer'} mt='2' textAlign={'left'}>
                <FormLabel onClick={onOpen} cursor={'pointer'}>Phone</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{user.phone}</Text>
                <ChangePhone isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>

        </Box>
        </>
      
    )
  }
  