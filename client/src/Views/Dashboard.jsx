import React from 'react'
import { Container, Box, Text } from "@chakra-ui/react"

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
                
                <Text>The Rizz App</Text>
            </Box>
        </Container>
    )
}

export default Dashboard