import { useDisclosure, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, setUser } = ChatState();

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

    const handleSubmit = () => { };

    const handleGroup = () => {};

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

                        {/* render searched users*/}
                        {/* Display loading Icon*/} 
                        {loading ? <Spinner></Spinner> : (   
                            searchResults?.slice(0, 4).map(user => (
                                <UserListItem key={user._id} user = {user} handleFunction = {() => handleGroup(user)} />
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