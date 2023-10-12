import { Box, Button, CloseButton } from '@chakra-ui/react'
import React from 'react'


export const UserBadgeItem = ({user, handleFunction}) => {
    return (
        <Box px={2} py={1} borderRadius={"large"} m={1} mb={2} variant="solid"
            fontSize={12} backgroundColor="#343D46" color={"white"} cursor={"pointer"} onClick={handleFunction} >
            {user.name}
        

            <i className="fas fa-rectangle-xmark" style={{  padding: "5px" }}></i>
        

        </Box>
    )
}
