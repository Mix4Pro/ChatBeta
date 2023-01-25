import './App.css';
import io from "socket.io-client"
import Login from './components/Login';
import Chat from "./components/Chat"
import axios from 'axios';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Registration from './components/Registration';
import { useEffect } from 'react';
const socket = io.connect("https://chatbeta.onrender.com");

useEffect(()=>{
  let response = await axios.get('https://chatbeta.onrender.com')

  console.log(response)
})
function App() {
  return (
    <>
    <div className='container'>
    <Router>
        <Routes>
          <Route path="/" element={
            <Login socket={socket}
          />}/>
          <Route path='/chat' element={
            <Chat socket={socket}/>
          } />
          <Route path='/registration' element={
            <Registration />
          } />
        </Routes>
      </Router>
    </div>
      
    </>
  );
}

export default App;
