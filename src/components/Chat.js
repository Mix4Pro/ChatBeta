// import { useEffect,useState , useMemo } from 'react'
// import { useLocation } from 'react-router-dom'
import ReactScrollableFeed from "react-scrollable-feed"
import axios from "axios"
// function Chat({socket}) {
//     let username
//     console.log(username)
//     const [message,setMessage] = useState('')
//     const [messages, setMesasges] = useState([]) 

//     useMemo(()=>{
//         axios.get('http://localhost:3001/chat')
//         .then((data)=>{
//             console.log(data.data)
//             username = data.data    
//             console.log(username)        
//         })
//     })

//     const sendMessage = ()=>{
//         if(message !== ''){
//             const CurrentMessage = {
//                 author: username,
//                 message: message,
//                 date: new Date(Date.now()).getHours() +
//                 ":" +
//                 new Date(Date.now()).getMinutes(),
//             }
//             socket.emit('send_message', CurrentMessage)
//             setMesasges([...messages,CurrentMessage])
//             setMessage('')
//         }
//     }
    
//     useEffect(()=>{
//         socket.on('recieve_message', (data)=>{
//             setMesasges([...messages,data])
//         })
//     })
//   return (
//     <div className='main-chatting'>
//         <div className='main-contacts'>
//             <div className='contacts-header'>
//                 <p>Contacts</p>
//             </div>
//             <div className='contacts'>
//                 <p className='contacts-name'>Beta Version XD</p>
//             </div>
//         </div>
//         {
//             username !== '' || username !== undefined ? (
//                 <div className='chatting-div'>
//                     <div className='message-header'>
//                         <p>Username: {username}</p>
//                     </div>

//                     <div className='message-block'>
//                         <ReactScrollableFeed>
//                             {
//                                 messages.map((val,i)=>{
//                                     return (
//                                         <div className='message' key={i}>
//                                             <div className='message-author'>
//                                                 <p>{val.author}</p>
//                                             </div>
//                                             <div className='message-p'  id={
//                                                 username === val.author ? 'me' : 'another'
//                                             }>
//                                                 <p>{val.message}</p>
//                                             </div>

//                                             <div className='message-date'>
//                                                 <p>{val.date}</p>
//                                             </div>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </ReactScrollableFeed>
//                     </div>

//                     <div className='message-form'>
//                         <div className='ins-message-form'>
//                             <textarea  
//                                 placeholder='Message...' 
//                                 rows="1"
//                                 onChange={(e)=>{setMessage(e.target.value)}} 
//                                 onKeyDown={(e)=>{
//                                     if(e.key === "Enter" && !e.shiftKey){
//                                         e.preventDefault()
//                                         sendMessage()
//                                         e.target.value = ''
//                                     }
//                                 }}
//                             ></textarea>

//                             <button onClick={sendMessage}>&#9658;</button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>You are not logged</h1>
//                 </div>
//             )
//         }
//     </div>
//   )
// }



// export default Chat


import React, { Component } from 'react';

class Chat extends Component {
    constructor(props){
        super(props);
        
        this.sendMessage = this.sendMessage.bind(this)
    }

    state = {
        username: '',
        message: '',
        messages: []
    }

    async sendMessage(){
        try{
            if(this.message !== ''){
                const CurrentMessage = {
                    author: this.state.username,
                    message: this.state.message,
                    date: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
               }
               let {author,message,date} = CurrentMessage
               await axios.post('https://chatbeta.onrender.com/chat-insert-message', {
                author,message,date   
               })
               this.props.socket.emit('send_message', CurrentMessage)
   
               console.log(this.props.socket)
               // this.setMesasges([...this.messages,CurrentMessage])
               this.setState({
                   messages: [...this.state.messages,CurrentMessage]
               })
               console.log(this.state.messages)
               // this.setMessage('')
               this.setState({message: ''})
            }
        }catch(err){
            console.log(err.message)
        }
    }

    async componentWillUnmount(){
        try{
            let userNameFromData = await axios.get("https://chatbeta.onrender.com/chat-get-username")
            
            let messagesFromData = await axios.get('https://chatbeta.onrender.com/chat-get-messages')

            console.log(messagesFromData)
            this.setState({
                username: userNameFromData.data
            })
            
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

    render() {
        return (
            <div className='main-chatting'>
                <div className='main-contacts'>
                    <div className='contacts-header'>
                        <p>Contacts</p>
                    </div>
                    <div className='contacts'>
                        <p className='contacts-name'>Beta Version XD</p>
                    </div>
                </div>
                {
                    this.state.username !== undefined ? (
                        <div className='chatting-div'>
                            <div className='message-header'>
                                <p>Username: {this.state.username}</p>
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
                                <div className='ins-message-form'>
                                    <textarea  
                                        placeholder='Message...' 
                                        rows="1"
                                        onChange={(e)=>{
                                            this.setState({
                                                message: e.target.value
                                            })
                                        }} 
                                        onKeyDown={(e)=>{
                                            if(e.key === "Enter" && !e.shiftKey){
                                                e.preventDefault()
                                                this.sendMessage()
                                                e.target.value = ''
                                            }
                                        }}
                                    ></textarea>

                                    <button onClick={this.sendMessage}>&#9658;</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>You are not logged</h1>
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