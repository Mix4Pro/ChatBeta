import React, { Fragment, useState } from 'react'
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

    const onSubmitForm = async (e)=>{
      
      try{
        const response = await fetch("http://localhost:3001", {
          method: "POST",
          headers: {"Content-type": "application/json"}
        })
        
        console.log(response)
      }catch(e){
        console.log(e)
      }
      e.preventDefault  ()
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
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    sendUser()
                }
              }}
            />
            
            <button onClick={sendUser}>Log in</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login