import React from 'react'
import {ButtonGroup} from '@chakra-ui/react'
import { LoginButtonNav } from './LoginButtonNav'
import { SignUpButtonNav } from './SignUpButtonNav'

export const ButtonGroupNav = () => {

    return(
        <>
            <ButtonGroup gap={'5'}>
                <LoginButtonNav/>
                <SignUpButtonNav/>
            </ButtonGroup>
        </>
    )
}