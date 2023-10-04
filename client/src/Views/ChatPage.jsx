import React, { useEffect, useState } from 'react'
//import axios from 'axios'
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../Components/misc/SideDrawer';
import ChatBox from '../Components/misc/ChatBox';
import MyChats from '../Components/misc/MyChats';


const ChatPage = () => {
    const { user } = ChatState()

    // Add logout function




    return
    <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box>
            {user && <MyChats />}
            {user && <ChatBox />}
        </Box>
    </div>;

};

export default ChatPage