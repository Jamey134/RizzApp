import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Tooltip, Box, Button, Text, MenuButton, Menu, MenuList, Avatar, MenuItem, MenuDivider } from '@chakra-ui/react';
import ProfileModal from './ProfileModal';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchState, setSearchState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user } = ChatState();


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
                    <Button variant={'ghost'}>
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
                            <ProfileModal user = {user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </Box>
        </>
    )
}

export default SideDrawer