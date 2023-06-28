import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { Input, InputRightElement, InputGroup, Image, Text } from '@chakra-ui/react'
  import { FiMenu } from 'react-icons/fi'
  import { SearchIcon } from '@chakra-ui/icons'
  import {Logos} from './assets/logo-tby.png'

  export const Navbar = () => {
    return (
        <>
        <Box maxH={'74'} borderBottom={'2px'} borderColor={'gray.100'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} margin={'auto'} p={'16px 15px'}>
                <Image 
                    inlineSize={'15%'}
                    src='https://i.imgur.com/QoZNb3H.png'>

                </Image>
                <Flex>
                <InputGroup>
                    <InputRightElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                    </InputRightElement>
                    <Input w={'620px'} bgColor={'white'} type='tel' placeholder='Search here'/>
                </InputGroup>
                </Flex>
                
                <ButtonGroup gap='5'>
                    <Button colorScheme='pink' variant='link'>
                        Login
                    </Button>
                    <Button colorScheme='pink' variant='solid'>
                        Sign up
                    </Button>
                </ButtonGroup>
        </Box>
        </>
    )
  }