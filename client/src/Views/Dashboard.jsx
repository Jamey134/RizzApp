import React from 'react'
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

const Dashboard = () => {
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

                <Text fontSize="4xl" fontFamily="Open Sans">The Rizz App</Text>
            </Box>
            <Box width="100%"
                margin="40px 0px 15px 0px"
                borderRadius="lg"
                borderWidth="1px"
                color="black">
                <Tabs variant='soft-rounded'>
                    <TabList>
                        <Tab width="50%">{/*<login/>*/}</Tab>
                        <Tab width="50%">{/*<register/>*/}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Dashboard