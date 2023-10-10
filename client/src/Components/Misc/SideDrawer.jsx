import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Tooltip, Box, Button, Text, MenuButton, Menu, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast } from '@chakra-ui/react';
import ProfileModal from './ProfileModal';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user } = ChatState();
    const navi = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();


    //--------LOGOUT FUNCTION---------

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navi("/")
    }

    //-------USER SEARCH FUNCTION-------

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter User Info in Search Bar",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Search Result",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post("/api/chat", { userId }, config);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {

        }
    }

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                backgroundColor={"white"}
                width={"100%"}
                padding={"5px 10px 5px 10px"}
                alignItems={"center"}
                borderWidth={"5px"}>
                <Tooltip
                    label="Search Users to Chat"
                    hasArrow
                    placement='bottom-end'>
                    <Button variant={'ghost'} onClick={onOpen}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <Text display={{ base: "none", medium: "flex" }} px={"4"}>Search User</Text>
                    </Button>
                </Tooltip>
                {/*-------------- I may have to install npm package for awesome font ------------- */}
                <Text fontSize={"2x1"} fontFamily={"Futura"}>Rizz App </Text>
                <div>
                    <Menu>
                        <MenuButton padding={2}>
                            <i class="fa-solid fa-exclamation"></i>
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<i class="fa-sharp fa-solid fa-circle-chevron-down"></i>}>
                            <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.profilePic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display={"flex"} padding={2}>
                            <Input placeholder='Search By Email or Name' marginRight={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleSearch}>Find</Button>
                        </Box>
                        {loading ? <ChatLoading /> : (
                            searchResult?.map(user => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)} />
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer