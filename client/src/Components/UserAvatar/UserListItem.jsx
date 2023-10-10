import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Avatar, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {

    

    return (
        <Box onClick={user, handleFunction}
            cursor="pointer"
            bg="#E8E8E8" //background
            _hover={{
                background: "#1C1C1C",
                color: "white",
            }}
            width="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3} // padding left and right
            py={2} // padding top and bottom
            mb={2} // margin bottom
            borderRadius="lg">
            <Avatar
                mr={2} //margin right
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profilePic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>

    )
}

export default UserListItem