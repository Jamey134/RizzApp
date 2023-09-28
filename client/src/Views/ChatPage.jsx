import React, { useEffect, useState } from 'react'
import axios from 'axios'


const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get('/api/chat')

        setChats(data);
    };

    // Add logout function

    useEffect(() => {
        fetchChats();
    }, []);


    return <div>
        {chats.map(chat => <div key = {chat.id}>{chat.chatName}</div>)}
        <h1>HELLLLLLLLLOOOOOOO!!!!!!!!</h1>
    </div>;

};

export default ChatPage