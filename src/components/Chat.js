// import { useLocation } from 'react-router-dom'
import React, { Component} from 'react';
import ReactScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import { FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Chat extends Component {
    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.inputField = React.createRef();
        this.signOut = this.signOut.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
    }
    
    state = {
        username: '',
        message: '',
        messages: [],
        theme: true
    }

    async sendMessage(){
        try{
            if(this.state.message !== ''){
                const CurrentMessage = {
                    author: this.state.username,
                    message: this.state.message,
                    date: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
               }
               this.inputField.current.value = ""
               let {author,message,date} = CurrentMessage
               await axios.post('https://chatbeta.onrender.com/chat-insert-message', {  
                author,message,date   
               })
               this.props.socket.emit('send_message', CurrentMessage)
   
               console.log(this.props.socket)
               this.setState({
                   messages: [...this.state.messages,CurrentMessage]
               })
               console.log(this.state.messages)
               this.setState({message: ''})
               console.log(this.state.username)
            }
        }catch(err){
            console.log(err.message)
        }
    }

    signOut(){
        localStorage.removeItem("username")
    }

    async componentWillMount(){
        try{    
            this.setState({
                theme: (localStorage.getItem('theme') === 'true')
            })
            console.log(this.state.username)
            console.log("Getting username")

            this.setState({
                username: localStorage.getItem('username')
            })

            console.log("Username is gotten")

            console.log(typeof this.state.username)
            
            let messagesFromData = await axios.get('https://chatbeta.onrender.com/chat-get-messages')

            console.log("messages are gotten")

            console.log(messagesFromData)
            
            this.setState({
                messages: messagesFromData.data
            })

            console.log(this.state.messages)
        }catch(err){
            this.setState({
                username: undefined
            })
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

    render() {
        return (
            <div className='main-chatting'>
                {/* <div className={
                    this.state.theme ? 'main-contacts c-light' : 'main-contacts c-dark'
                }>
                    <div className='contacts-header'>
                        <p>Contacts</p>
                    </div>
                    <div className='contacts'>
                        <p className='contacts-name'>Beta Version XD</p>
                    </div>
                </div> */}
                {
                    typeof this.state.username == "string" ? (
                        <div className={
                            this.state.theme ? 'chatting-div light' : 'chatting-div dark'
                        }>
                            <div className='message-header'>
                                <button className='theme' onClick={this.changeTheme}><FaMoon style={{color: this.state.theme ? '#000' : '#fff'}}/></button>
                                <p>Username: {this.state.username}</p>

                                <Link to='/' onClick={this.signOut}>Sign Out</Link>
                            </div>

                            <div className='message-block'>
                                <ReactScrollableFeed>
                                    {
                                        this.state.messages.map((val,i)=>{
                                            return (
                                                <div className='message' key={i}>
                                                    <div className='message-author'>
                                                        <p>{val.author}</p>
                                                    </div>
                                                    <div className='message-p'  id={
                                                        this.state.username === val.author ? 'me' : 'another'
                                                    }>
                                                        <p>{val.message}</p>
                                                    </div>

                                                    <div className='message-date'>
                                                        <p>{val.date}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </ReactScrollableFeed>
                            </div>

                            <div className='message-form'>
                                <div className={
                                    this.state.theme ? 'ins-message-form inp-light' : 'ins-message-form inp-dark'
                                }>
                                    <textarea  
                                        placeholder='Message...' 
                                        rows="1"
                                        className={
                                            this.state.theme ? ' inp-light' : 'ins-message-form inp-dark'
                                        }
                                        onChange={(e)=>{
                                            this.setState({
                                                message: e.target.value
                                            })
                                        }} 
                                        onKeyDown={(e)=>{
                                            if(e.key === "Enter" && !e.shiftKey){
                                                e.preventDefault()
                                                this.sendMessage()
                                            }
                                        }}

                                        ref={this.inputField}
                                    ></textarea>

                                    <button style={{color: this.state.theme ? '#000' : '#fff'}} type="submit" onClick={this.sendMessage}>&#9658;</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className={
                                this.state.theme ? 'light' : 'dark'
                            }>You are not logged</h1>
                        </div>
                    )
                }
            </div>
        );
    }

    async componentDidMount(){
        this.props.socket.on('recieve_message', (data)=>{
            this.setState({
                messages: [...this.state.messages,data]
            })
        })


    }
}

export default Chat;