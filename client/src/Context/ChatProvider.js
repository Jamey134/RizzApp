import { useState, createContext, useContext, useEffect } from "React"
import { useNavigate } from "react-router-dom";



const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo);

        if (!userInfo) {
        navigate.push("/")
        }
    }, [navigate])

    return (
        <ChatContext.Provider value={{ user, setUser }}> {children} </ChatContext.Provider>
    );
}




export const ChatState = () => {

    return useContext(ChatContext);
}

export default ChatProvider;