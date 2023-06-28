import React from 'react'
import { InputRightElement, Input, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const SearchBarNav = () => {

    return(
        
        <>
            <Input w={'620px'} bgColor={'white'} type='tel' placeholder='Search here'/>
            <InputRightElement>
                <Button variant={'ghost'}>
                <SearchIcon color='gray.300' />
                </Button>
            </InputRightElement>
        </>
    )
}