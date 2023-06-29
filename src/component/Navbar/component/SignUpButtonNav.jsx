import React from 'react'
import {Button, useDisclosure} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export const SignUpButtonNav = () => {
    const navigate = useNavigate()
    const toRegistPage = () => {
        navigate("/register")
    }
    return(
        <>
           <Button onClick={toRegistPage} colorScheme='pink' variant='solid'>
                Sign up
            </Button>  
        </>
    )
}