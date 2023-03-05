import React, { Component } from 'react'
import axios from "axios"
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import { FaMoon } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

// function Registration() {
//     const navigate = useNavigate()
//     const [username , setUsername] = useState('')
//     const [password , setPassword] = useState('')
//     const [theme,setTheme] = useState()
//     const toastOptions = {
//       className: "toast",
//       position: 'bottom-right',
//       autoClose: 8000,
//       pauseOnHover: true,
//       draggable: true,
//     }
//     const RegUser = async (e) => {
        
//     }

//     const changeTheme = ()=>{
//       await this.setState({
//         theme: !this.state.theme
//       })
//       localStorage.setItem('theme', this.state.theme)
      
//       if(this.state.theme === true){
//         document.body.style.background = '#fff'
//         console.log('white')
//       }else{
//         document.body.style.background = '#060A13'
//         console.log('dark')
//       }
//     }
//   return (
//     <Fragment>
//     <div className={
//         this.state.theme ? 'main-login-div light' : 'main-login-div dark'
//       }>
//         <div className='login-header'>
//           <div className='theme-div'>
//             <button className='theme' onClick={changeTheme}><FaMoon style={{color: this.state.theme ? '#000' : '#fff'}} /></button>
//           </div>

//             <h2>Welcome To HoYo Chat!</h2>

//             <Link className='btn-sign-up' to='/registration'>Sign Up</Link>
//         </div>

//         <div className='login-form-div'>
//           <div className='login-form-inner-div'>
//             <h2>Log In</h2>
//             <form className='form' action='/' method='POST' onSubmit={()=> this.regUser}>
//               <input 
//                 type='text' 
//                 ref={this.inputs}
//                 placeholder="Username..." 
//                 className='login-form-inp'
//                 onChange={(e)=>{setUsername(e.target.value)}}
//               />

//               <input 
//                 type='password' 
//                 placeholder="Password..." 
//                 className='login-form-inp'
//                 onChange={(e)=>{setPassword(e.target.value)}}
//               />
//             </form>
//             <Link className='btn-form' type='button' onClick={this.RegUser} username={this.state.username}>Sign Up</Link>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//       </Fragment>
//   )
// }


class Registration extends Component {
  constructor(props){
    super(props);
    this.RegUser = this.RegUser.bind(this)
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

  async RegUser(e){
    try{
      let username = this.state.username
      let password = this.state.password
      console.log(username , password)
      if(password.length >= 8 && password.length <= 20){
        await axios.post('http://localhost:3001/registration' , {
          username , password
      } )

        localStorage.setItem("username",username)
        this.props.navigate('/chat')
      }else{
        toast.error("Password must contain at least 8 characters and 20 characters at most")
      }
    }catch(e){
      console.log(e)
      toast.error("This user already exists", this.state.toastOptions)
    }
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

            <Link className='btn-sign-up' to='/'>Log In</Link>
        </div>

        <div className='login-form-div'>
          <div className='login-form-inner-div'>
            <h2>Sign Up</h2>
            <form className='form' action='/' method='POST' onSubmit={()=> this.RegUser}>
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
            <Link className='btn-form' type='button' onClick={this.RegUser} username={this.state.username}>Sign Up</Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default function MainRegistration (props){
  const navigate = useNavigate()

  return <Registration socket={props.socket} navigate={navigate} />
}

// export default Registration