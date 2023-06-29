import React from "react";
import { Text, Box, SimpleGrid, Icon, Stack, Button, ButtonGroup, PopoverContent, IconButton} from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverBody, Portal } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FooterSignUp } from "./FooterSignUp";

export const Footer = () => {
    
    return(
        <>
        <Box  bgColor={"pink.50"} p={{ base: 5, md: 10 }} >
        <SimpleGrid
            flexDirection="column-reverse"
            gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr']}
            borderTopColor="gray.900"
        >
            <Box>
                <SimpleGrid columns={[1, 3]}>
                <IconButton
                    as="a"
                    href="#"
                    variant="link"
                    color="pink.500"
                    aria-label="Twitter"
                    icon={<FaTwitter fontSize="2.5rem" />}
                />
                <IconButton
                    as="a"
                    href="#"
                    variant="link"
                    color="pink.500"
                    aria-label="Twitter"
                    icon={<FaFacebook fontSize="2.5rem" />}
                />
                <IconButton
                    as="a"
                    href="#"
                    variant="link"
                    color="pink.500"
                    aria-label="Twitter"
                    icon={<FaInstagram fontSize="2.5rem" />}
                />
            
                </SimpleGrid>
                </Box>
            <Box d={['none', 'none', 'block', 'block']}>
                <FooterSignUp />
            </Box>
        </SimpleGrid>
        <Box>
            
        </Box>
        </Box>
        
        </>
    )
}