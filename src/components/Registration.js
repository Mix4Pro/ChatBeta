import React, { Fragment, useState } from 'react'
import axios from "axios"
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
    const navigate = useNavigate()
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const toastOptions = {
      className: "toast",
      position: 'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
    }
    const RegUser = async (e) => {
        try{
            await axios.post('https://chatbeta.onrender.com/registration' , {
                username , password
            })

            localStorage.setItem("username",username)
            navigate('/chat')
        }catch(e){
            console.log(e)
            toast.error("This user already exists", toastOptions)
        }
    }
  return (
    <Fragment>
    <div className='div-login-form'>
        <div className='login-form'>
          <h1>Sign Up</h1>
          <form action='/registration' method='POST' onSubmit={()=> RegUser}>
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
            <Link type='button' onClick={RegUser}>Log in</Link>
          </form>
        </div>
      </div>
      <ToastContainer />
      </Fragment>
  )
}

export default Registration