import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({socket}) {
  const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const sendUser = async () =>{
      if(username !== ''){
        await socket.emit("login", username)

        navigate('/chat', {
          state: {
            username,
          }
        })
      }
    }
  return (
    <div className='div-login-form'>
      <div className='login-form'>
        <h1>Welcome to HoYo Chatting !</h1>
        <input 
          type='text' 
          placeholder="Username..." 
          onChange={(e)=>{setUsername(e.target.value)}}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
                sendUser()
            }
        }}
        />
        
        <button onClick={sendUser}>Log in</button>
      </div>
    </div>
      
  )
}

export default Login