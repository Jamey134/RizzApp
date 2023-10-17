import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogic';
import ProfileModal from './Misc/ProfileModal';
import UpdateGroupChatModal from './Misc/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [message, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "30px", md: "32px" }}
                        pb={3}
                        px={2}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={{ base: "space-between" }}
                        alignItems={"center"}
                        fontFamily={"futura"}
                    >
                        <IconButton
                            display={{ base: "flex", medium: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        )}
                    </Text>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        padding={3}
                        flexDir={"column"}
                        width={"100%"}
                        height={"90%"}
                        borderRadius={"large"}
                        overflowY={"hidden"}
                        background={"#E8E8E8"}
                    >
                        {loading ? (
                            <Spinner
                                size={"xl"}
                                width={20}
                                height={20}
                                alignSelf={"center"}
                                margin={"auto"}
                            />
                        ) : null}
                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text fontSize="25px" fontFamily="futura" pb={3}>
                        Select a user to start a chat.
                    </Text>
                </Box>
            )}
        </>
    );
};


export default SingleChat