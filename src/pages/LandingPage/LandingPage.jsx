import React from "react"
import{ Box } from "@chakra-ui/react"
import { Navbar1 } from "../../component/Navbar"
import { Footer } from "../../component/Footer/Footer"
import { Slide } from "../../component/Slide"
import AllPosts from "./AllPost"


export const LandingPage = () => {
    
    return(
        <Box mt={'20'}>
            <Box>
            <Navbar1/>
            <Slide/>
            <AllPosts/>
            <Footer/>
        </Box>
        </Box>
    )
}