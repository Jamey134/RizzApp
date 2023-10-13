import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import {  ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons';

const SingleChat = (fetchAgain, setFetchAgain) => {

const {user, selectedChat, setSelectedChat} = ChatState();

    return <>{
        selectedChat ? (
            <>
            <Text
            fontSize={{ base: "30px", md: "32px"}}
            pb={3}
            px={2}
            width={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between"}}
            alignItems={"center"}
            fontFamily={"futura"}
            >
            <IconButton
            display={{ base: "flex", medium: "none"}}
            icon={<ArrowBackIcon/>}
            onClick={() => setSelectedChat("")}
            />
            </Text>
            </>

        ) : (
            <Box display = "flex" alignItems = "center" justifyContent = "center" height ="100%">
                <Text fontSize = "25px" fontFamily = "futura" pb={3}>
            Select an user to start chat.
                </Text>

            </Box>
        )
    
    } </>;
    
};

export default SingleChat