import React from 'react'
import { Box } from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'


export const UserBadgeItem = ({user, handleFunction}) => {
    return (
        <Box px={2} py={1} borderRadius={"large"} m={1} mb={2} variant="solid"
            fontSize={12} backgroundColor="#282B30" color={"white"} cursor={"pointer"} onClick={handleFunction} >
            {user.name}
            <CloseIcon pl={1}/> {/*Make Icon Clickable*/}
        </Box>
    )
}
