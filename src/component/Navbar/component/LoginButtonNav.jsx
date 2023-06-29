import React from 'react'
import {Button, useDisclosure} from '@chakra-ui/react'
import { LoginModal } from './LoginModal'
import { useNavigate, useLocation} from 'react-router-dom'
import { LandingPage } from '../../pages/LandingPage/LandingPage'
import { useState } from 'react'


export const LoginButtonNav = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <>
            <Button onClick={onOpen} colorScheme='pink' variant='link'>
                Login
            </Button>
            <LoginModal isOpen={isOpen} onClose={onClose} onOpen={() => {onOpen() 
                navigate('/login')}} />
        </>
    )
}