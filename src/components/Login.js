import React, { Component, useEffect } from 'react';
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import { FaMoon } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';



class Login extends Component {
  constructor(props){
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.changeTheme = this.changeTheme.bind(this)

    this.inputs = React.createRef();
  }

  state = {
    username: '',
    password: '',
    theme: false,
    toastOptions: {
      className: "toast",
      position: 'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
    }
  }

  async onSubmitForm(e){
    try{
      let username = this.state.username
      let password = this.state.password
      console.log(this.props.socket)
      if(username !== '' && password !== ''){
        if(password.length >= 8){
          await this.props.socket.emit("login",username)

          console.log("POST IS SENDING")
          
          await axios.post('https://chatbeta.onrender.com' , {
            username , password
          })

          console.log("POST IS SENT")

          localStorage.setItem("username",username)

          // navigate('/chat',{
          //   username: username
          // })

          this.props.navigate('/chat')
        }
        else{
          toast.error("Password must contain at least 8 characters")
        }
      }
      }catch(e){
        console.log(e)
        toast.error("Username or Password is incorrect.", this.state.toastOptions)
      }
      e.preventDefault()
    }

    async changeTheme(){
      await this.setState({
        theme: !this.state.theme
      })
      localStorage.setItem('theme', this.state.theme)
      
      if(this.state.theme === true){
        document.body.style.background = '#fff'
        console.log('white')
      }else{
        document.body.style.background = '#060A13'
        console.log('dark')
      }
    }
  componentWillMount(){
    if(localStorage.getItem('theme') === null){
      localStorage.setItem('theme', this.state.theme)
    }else{
      this.setState({
        theme: (localStorage.getItem('theme') === 'true')
      })
      if(this.state.theme === true){
        document.body.style.background = '#fff'
        console.log('white')
      }else{
        document.body.style.background = '#060A13'
        console.log('dark')
      }
    }
    
  }


  render() {
    return (
      <div className={
        this.state.theme ? 'main-login-div light' : 'main-login-div dark'
      }>
        <div className='login-header'>
          <div className='theme-div'>
            <button className='theme' onClick={this.changeTheme}><FaMoon style={{color: this.state.theme ? '#000' : '#fff'}} /></button>
          </div>

            <h2>Welcome To HoYo Chat!</h2>

            <Link className='btn-sign-up' to='/registration'>Sign Up</Link>
        </div>

        <div className='login-form-div'>
          <div className='login-form-inner-div'>
            <h2>Log In</h2>
            <form className='form' action='/' method='POST' onSubmit={()=> this.onSubmitForm}>
              <input 
                type='text' 
                ref={this.inputs}
                placeholder="Username..." 
                className='login-form-inp'
                onChange={(e)=>{
                  this.setState({
                    username: e.target.value
                  })
                }}
              />

              <input 
                type='password' 
                placeholder="Password..." 
                className='login-form-inp'
                onChange={(e)=>{
                  this.setState({
                    password: e.target.value
                  })
                }}
              />
            </form>
            <Link className='btn-form' type='button' onClick={this.onSubmitForm} username={this.state.username}>Log in</Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}



export default function MainLogin (props){
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('username')){
      console.log(typeof(localStorage.getItem('username')))
      navigate('/chat')
    }
  })

  return <Login socket={props.socket} navigate={navigate} />
}

// export default Login;