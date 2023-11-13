import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, useToast, Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogic';
import GroupChatModal from './Misc/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
    // State and context initialization
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    // Toast notification for error messages
    const toast = useToast();

    // Function to fetch the user's chats from the server
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // Make an API call to fetch user's chats
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            // Handle errors and shows a toast notification
            toast({
                title: "Error Occurred!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    // useEffect hook to run fetchChats and set loggedUser when fetchAgain changes
    useEffect(() => {
        // Get the logged-in user's information from local storage
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        // Fetch the user's chats
        fetchChats();
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", medium: "flex" }}
            flexDir={"column"}
            alignItems={"center"}
            padding={3}
            background={"white"}
            width={{ base: "100%", md: "30%" }}
            borderRadius={"large"}
            borderWidth={"1px"}>
            <Box
                paddingBottom={3}
                px={3}
                fontSize={{ base: "28px", medium: "40px" }}
                fontFamily={"Futura"}
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                {/* Header with "My Chats" and "New Group Chat" button */}
                My Chats
                <GroupChatModal>
                    <Button
                        display={"flex"}
                        fontSize={{ base: "20px", medium: "10px", large: "20px" }}
                        rightIcon={<i class="fa-solid fa-plus"></i>}>
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display={"flex"}
                flexDir={"column"}
                padding={3}
                background={"#F8F8F8"}
                width={"100%"}
                height={"90%"}
                borderRadius={"large"}
                overflowY={"hidden"}
            >

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
                                    {/* Display sender's name or group chat name */}
                                    {!chat.isGroupChat ?
                                        getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    // Show a loading indicator if chats are still loading
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
}

export default MyChats;
