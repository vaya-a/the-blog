import React from 'react'
import { Image } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

export const ImageNav = () => {
    const navigate = useNavigate()
    const toLandingPage = () => {
        navigate("/")
      }

    return(
        <>
            <Image
                onClick={toLandingPage}
                cursor={'pointer'}
                inlineSize={'15%'}
                src='https://i.imgur.com/QoZNb3H.png'>
            </Image>
        </>
    )
}