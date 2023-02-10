import './App.css';
import io from "socket.io-client"
import MainLogin from './components/Login';
import Chat from "./components/Chat"
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Registration from './components/Registration';
const socket = io.connect("https://chatbeta.onrender.com");
// let navigation;
function App() {
  return (
    <>
    <div className='container'>
    <Router>
        <Routes>
          <Route path="/" element={
            <MainLogin socket={socket}
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
