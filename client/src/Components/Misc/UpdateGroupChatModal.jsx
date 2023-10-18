import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure, Modal, Input, Box, Button, ModalHeader, ModalContent, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useToast, FormControl, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { UserBadgeItem } from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { user, selectedChat, setSelectedChat } = ChatState();

    const toast = useToast();

    const handleRemove = async (user1) => {
        if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) { // <-- this checks if groud admin ID doesn't match the user and the user who's logged in doesnt match the user who is being removed
            toast({
                title: "Only Admin can Remove Someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        return;
        }
        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}  = await axios.put(
                "/api/chat/removeGroup",
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            fetchMessages();
            setLoading(false);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
        setLoading(false);
        }
    };

    //Update Group Chat's Name
    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                config
            );

            console.log(data._id);

            setSelectedChat(data);
           // setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenameLoading(false);
        };
        setGroupChatName(""); // Error toast is occuring when running this function. Needs to be debugged 
    };

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in Group Chat!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only Admin Can Add Someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const {data} = await axios.put("/api/chat/addGroup", {
                chatId: selectedChat._id,
                userId: user1._id,
            },
            config
            );
            
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            console.log("ERROR MSG --->")
            console.log(error)
            toast({
                title: "Error occured!",
                description: error.response,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        setLoading(false);
        }
    };


    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box pb={3} width={"100%"} display={"flex"} flexWrap={"wrap"}>
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem key={user._id} user={u}
                                    handleFunction={() => handleRemove(u)} />
                            ))}
                        </Box>
                        <FormControl display={"flex"}>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                colorScheme='blue'
                                ml={1}
                                variant={"solid"}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add User to Group'
                                mb={1}
                                onChange={(a) => handleSearch(a.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="large" /> // <---- Possibly remove this
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal