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
  import { ChangeEmail } from "./ChangeEmail";

  export default function Email() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useSelector((state) => state.UserReducer)

    return (
        <>
        <Box>
            <FormControl onClick={onOpen} cursor={'pointer'} mt='2' textAlign={'left'}>
                <FormLabel onClick={onOpen} cursor={'pointer'}>Email</FormLabel>
                <Text onClick={onOpen} cursor={'pointer'}>{user.email}</Text>
                <ChangeEmail isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </FormControl>

        </Box>
        </>
      
    )
  }
  