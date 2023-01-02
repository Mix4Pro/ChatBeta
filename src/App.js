import './App.css';
import io from "socket.io-client"
import Login from './components/Login';
import Chat from "./components/Chat"
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
const socket = io.connect("http://localhost:3001");

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
        </Routes>
      </Router>
    </div>
      
    </>
  );
}

export default App;
