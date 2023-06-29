import React from "react";
import { Box, Flex} from '@chakra-ui/react'
import { ImageNav } from "./ImageNav";
import { ButtonGroupNav } from "./component/ButtonGroupNav";
import { InputGroupNav } from "./InputGroupNav";
import { ProfileMenu } from "./ProfileMenu";
import { useSelector } from "react-redux";

export const Navbar1 = () => {

    const login = localStorage.getItem("token")
    const userLogin = useSelector((state) => state.UserReducer.login);
    return(
        <>
            <Box zIndex={'1'} w={'100%'} bgColor={'white'} position={'fixed'} maxH={'74'} borderBottom={'2px'} borderColor={'gray.100'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} top={'0'} p={'16px 15px'}>
                {!userLogin && !login ? 
                <>
                <ImageNav/>
                <Flex>
                    <InputGroupNav/>
                </Flex>
                <ButtonGroupNav/>
                </>:
                <>
                <ImageNav/>
                <Flex>
                    <InputGroupNav/>
                </Flex>
                    <ProfileMenu/>
                </>}
            </Box>

        </>
    )
}

