import React, { useEffect } from "react"
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Login from "../Components/Authentication/Login"
import Register from "../Components/Authentication/Register"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navi = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))


        if (user)
            navi("/chats");

    }, [navi]);



    return (
        <Container maxWidth='xl' centerContent>
            <Box display='flex'
                justifyContent='center'
                padding={3}
                background={'white'}
                width="100%"
                margin="40px 0px 15px 0px"
                borderRadius="lg"
                borderWidth="1px">

                <Text fontSize="4xl" fontFamily="Futura">The Rizz App</Text>
            </Box>
            <Box width="100%"
                padding={4}
                background={'white'}
                margin="40px 0px 15px 0px"
                borderRadius="lg"
                borderWidth="1px"
                color="black">
                <Tabs variant='soft-rounded' >
                    <TabList>
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>{<Login />} </TabPanel>
                        {<TabPanel> {<Register />} </TabPanel>}
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Dashboard