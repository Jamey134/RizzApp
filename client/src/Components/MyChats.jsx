import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, useToast, Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogic';

const MyChats = () => {
    const [loggedUser, setloggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            console.log(data)
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [])
    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", medium: "flex" }}
            flexDir={"column"}
            alignItems={"center"}
            padding={3}
            background={"white"}
            width={{ base: "100%", md: "30%" }}
            borderRadius={"large"}
            borderWidth={"3px"}>
            <Box
                paddingBottom={3}
                px={3}
                fontSize={{ base: "38px", medium: "40px" }}
                fontFamily={"Futura"}
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                My Chats
                <Button
                    display={"flex"}
                    fontSize={{ base: "20px", medium: "10px", large: "20px" }}
                    rightIcon={<i class="fa-solid fa-plus"></i>}>
                    New Group Chat
                </Button>
            </Box>
            <Box
                display={"flex"}
                flexDir={"column"}
                padding={3}
                background={"#F8F8F8"}
                width={"100%"}
                height={"100%"}
                borderRadius={"large"}
                overflowY={"hidden"}>

                {chats ? (
                    <Stack overflowY={"scroll"}>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor={"pointer"}
                                background={selectedChat === chat ? "#3882AC" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius={"large"}
                                key={chat._id}>
                                <Text>
                                    {!chat.isGroupChat ?
                                        getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    )
}



export default MyChats