import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Input,
    Image,
    InputGroup,
    InputRightElement,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

  export const SignUpModal = ({ isOpen, onClose }) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader ps={'19'} justifyContent={'center'} mt={'10'} >
                <Image
                  ml={'20'}
                  inlineSize={'65%'}
                  src='https://i.imgur.com/QoZNb3H.png'>
                </Image>
            <br>
            </br>
            <Text ml={'6'}>Let's Start Your Beauty Journey with Us!</Text>
                </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <InputGroup display={'flex'} gap={'1'} mb={'2'}>
                  <Input placeholder="First Name" type="text" name="firstname"></Input>
                  <Input placeholder="Last Name" type='text' name="lastname"></Input>
                </InputGroup>
                <FormLabel>Username</FormLabel>
                <Input type="text"></Input>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
                <FormLabel>Password</FormLabel>
                <InputGroup mb={'5'}>
                <Input type={show ? 'text' : 'password'} name="password" />
                <InputRightElement width='4.5rem'>
                <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick}>
                {show ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                </Button>
                </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="pink" mr={3}>
                Register now!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };