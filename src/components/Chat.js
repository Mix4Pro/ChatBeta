import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactScrollableFeed from "react-scrollable-feed"

function Chat({socket}) {
    const location = useLocation()
    const username = location.state.username
    const [message,setMessage] = useState('')
    const [messages, setMesasges] = useState([]) 

    const sendMessage = ()=>{
        if(message !== ''){
            const CurrentMessage = {
                author: username,
                message: message,
                date: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            }
            socket.emit('send_message', CurrentMessage)
            setMesasges([...messages,CurrentMessage])
            setMessage('')
        }
    }

    useEffect(()=>{
        socket.on('recieve_message', (data)=>{
            setMesasges([...messages,data])
        })
    })
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
            username !== '' || username !== undefined ? (
                <div className='chatting-div'>
                    <div className='message-header'>
                        <p>Username: {username}</p>
                    </div>

                    <div className='message-block'>
                        <ReactScrollableFeed>
                            {
                                messages.map((val,i)=>{
                                    return (
                                        <div className='message' key={i}>
                                            <div className='message-author'>
                                                <p>{val.author}</p>
                                            </div>
                                            <div className='message-p'  id={
                                                username === val.author ? 'me' : 'another'
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
                                onChange={(e)=>{setMessage(e.target.value)}} 
                                onKeyDown={(e)=>{
                                    if(e.key === "Enter" && !e.shiftKey){
                                        e.preventDefault()
                                        sendMessage()
                                        e.target.value = ''
                                    }
                                }}
                            ></textarea>

                            <button onClick={sendMessage}>&#9658;</button>
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
  )
}



export default Chat