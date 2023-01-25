import React, { Fragment, useState } from 'react'
// import {Link} from "react-router-dom"
import axios from "axios"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Login({socket}) {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const toastOptions = {
    className: "toast",
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  }
    const onSubmitForm = async (e)=>{
      try{
        console.log(socket)
        if(username !== '' && password !== ''){
          await socket.emit("login", username)

          console.log("POST IS SENDING")
          
          await axios.post('https://chatbeta.onrender.com' , {
            username , password
          })

          console.log("POST IS SENT")
          navigate('/chat',{
            username: username
          })
        }
        }catch(e){
          console.log(e)
          toast.error("Username or Password is incorrect.", toastOptions)
        }
        e.preventDefault()
      }
  return (
    <Fragment>
      <div className='div-login-form'>
        <div className='login-form'>
          <h1>Welcome to HoYo Chatting !</h1>
          <form action='/' method='POST' onSubmit={()=> onSubmitForm}>
            <input 
              type='text' 
              placeholder="Username..." 
              onChange={(e)=>{setUsername(e.target.value)}}
            />

            <input 
              type='password' 
              placeholder="Password..." 
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Link type='button' onClick={onSubmitForm} username={username}>Log in</Link>

          </form>
          <Link to="/registration">Sign Up</Link>
        </div>
      <ToastContainer />
      </div>
    </Fragment>
  )
}


export default Login