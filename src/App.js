import './App.css';
import io from "socket.io-client"
import MainLogin from './components/Login';
import Chat from "./components/Chat"
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import MainRegistration from './components/Registration';
import Loading from './modules/Loading';
const socket = io.connect("https://chatbeta.onrender.com");
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
            <MainRegistration />
          } />
          <Route path="/loading" element={
            <Loading />
          } />
        </Routes>
      </Router>
    </div>
      
    </>
  );
}

export default App;
