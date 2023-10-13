import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure, Modal, Input, Box, Button, ModalHeader, ModalContent, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useToast, FormControl } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { UserBadgeItem } from '../UserAvatar/UserBadgeItem';
import axios from 'axios';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { user, selectedChat, setSelectedChat } = ChatState();

    const toast = useToast();

    const handleRemove = () => {

    };

    const handleRename = async () => {
        if (!groupChatName)
            return

        try {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put("/api/chat/rename", {
                chatId: selectedChat._id,
                chatName: groupChatName,
            },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.res.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        setRenameLoading(false);
        }
    };

    const handleSearch = () => {

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