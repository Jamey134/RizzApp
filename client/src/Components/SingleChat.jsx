import React, { useState, useEffect } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Input, Spinner, Text, FormControl, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogic';
import ProfileModal from './Misc/ProfileModal';
import UpdateGroupChatModal from './Misc/UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import "/Users/jamey134/Desktop/CodingProjects/RizzApp/client/src/Components/Style.css";
import animationData from "../Animation/typing.json"
import Lottie from "lottie-react"
import io from "socket.io-client";

const ENDPOINT = process.env.PORT; // Change for deployment

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setisTyping] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const toast = useToast();

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat)
            return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true)

            const { data } = await axios.get(`api/message/${selectedChat._id}`, config);


            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        };
    };

    console.log(messages);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setisTyping(true));
        socket.on("stop typing", () => setisTyping(false));
    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    console.log(notification, "<-------------")

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                if(!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });


    });

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };

                const { data } = await axios.post("/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );

                // console.log(data); // <--- Checking if the sender's message is registering.

                socket.emit("new message", data);
                // setNewMessage("");
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to Send Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };


    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // Typing indicator Logic
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };


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
                                    fetchMessages={fetchMessages}
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
                        ) : (
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {isTyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (<></>)}
                            <Input
                                variant="filled"
                                background={"F8F8F8"}
                                placeholder='Type Message Here..'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
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