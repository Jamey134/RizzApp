//import { Button } from '@chakra-ui/react'
import { Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './Views/Dashboard';
import ChatPage from './Views/ChatPage';

function App() {
  return (
    <div className="App">
      {<Routes>
        <Route path="/" Component ={Dashboard}></Route>
        <Route path="/chats" Component ={ChatPage}></Route>
      </Routes>}
    </div>
  );
}

export default App;
