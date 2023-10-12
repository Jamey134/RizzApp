import { useDisclosure, Box, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import { UserBadgeItem } from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

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
            setSearchResults(data);
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

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please Fill In Fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post("/api/chat/group", {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },
            config
            ); 

            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create Group Chat!",
                description: error.res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleDelete = (deleteUser) => {
        setSelectedUsers(selectedUsers.filter((s) => s._id !== deleteUser._id));
    };

    const handleGroup = (addUser) => {
        if (selectedUsers.includes(addUser)) {
            toast({
                title: "User Already Added!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            })
        }
        setSelectedUsers([...selectedUsers, addUser]); {/* This will spread the selected users and add to group}*/ }
    };

    return (
        <>
            <span onClick={onOpen}> {children} </span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"35px"} fontFamily={"Futura"} display={"flex"} justifyContent={"center"}>
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
                        <FormControl>
                            <Input
                                onChange={(e) => setGroupChatName(e.target.value)}
                                marginBottom={3}
                                placeholder="Chat Name"
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                onChange={(e) => handleSearch(e.target.value)}
                                marginBottom={1}
                                placeholder="Add Users"
                            />
                        </FormControl>

                        <Box width={"100%"} display={"flex"} flexWrap={"wrap"}>
                            {selectedUsers.map(u => (
                                <UserBadgeItem key={user._id} user={u}
                                    handleFunction={() => handleDelete(u)} />
                            ))}
                        </Box>

                        {/* render searched users*/}
                        {/* Display loading Icon*/}
                        {loading ? <Spinner></Spinner> : (
                            searchResults?.slice(0, 4).map(user => (
                                <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


export default GroupChatModal