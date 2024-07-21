// import { useLocation } from 'react-router-dom'
import React, { Component} from 'react';
import ReactScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import { FaMoon } from 'react-icons/fa';
import { BiSend } from "react-icons/bi";
import {FaPaperclip} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import {storage} from "../firebase"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import Loading from '../modules/Loading';


class Chat extends Component {
    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
        this.inputField = React.createRef();
        this.inputImg = React.createRef();
        this.signOut = this.signOut.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
    }
    
    state = {
        username: '',
        message: '',
        messages: [],
        theme: true,
        image: '',
        tempCurrentMessage: [],
        isLoading: true
    }

    async sendMessage(e){
        try{
            e.preventDefault()
            if(this.state.message !== "" || this.state.image !== ""){
                let image_url = null;
                if(this.state.image !== ''){
                    console.log("DONE")
                    let img_id = (new Date(Date.now()).getSeconds() + new Date(Date.now()).getMilliseconds()) *  Math.random()
                    const imageRef = ref(storage, `/imges/${this.state.username}_${img_id}`);
                    console.log(imageRef)
                    await uploadBytes(imageRef,this.state.image).then(async ()=>{
                        await getDownloadURL(imageRef).then(async (url)=>{
                            console.log(url)

                            image_url = url
                            console.log(`There u got : ${image_url}`)
                        }).catch(err => console.log(err))
                    })
                }
                
                const CurrentMessage = {
                    author: this.state.username,
                    message: this.state.message,
                    date: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                    image: image_url
                }
                this.setState({
                    tempCurrentMessage: CurrentMessage
                })
                this.inputField.current.value = ""
                this.inputImg.current.value = ""
                let {author,message,date,image} = CurrentMessage
                this.setState({
                    messages: [...this.state.messages,CurrentMessage]
                })
                console.log('GOING...')
                console.log(image)
                await axios.post('https://chatbeta.onrender.com/chat-insert-message', {  
                    author,message,date,image
                })
                console.log(CurrentMessage)

                // https://chatbeta.onrender.com/chat-insert-message
                

                this.setState({message: '',image: ''})
                this.props.socket.emit('send_message', CurrentMessage)

                console.log(this.state.messages)
            }
        }catch(err){
            console.log(err.message)
        }
    }

    handleImageChange(e){
        this.setState({
            image : e.target.files[0]

        })
        console.log(this.state.image)
    }

    signOut(){
        localStorage.removeItem("username")
    }

    async changeTheme(){
        await this.setState({
          theme: !this.state.theme
        })
        localStorage.setItem('theme', this.state.theme)
        if(this.state.theme === true){
          document.body.style.backgroundColor = '#fff'
          console.log('white')
        }else{
          document.body.style.backgroundColor = '#060A13'
          console.log('dark')
        }
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

            // https://chatbeta.onrender.com/chat-get-messages

            console.log("messages are gotten")

            console.log("SATE SATE SATE",messagesFromData)
            
            this.setState({
                messages: messagesFromData.data
            })

            this.setState({
                isLoading: false
            })
            console.log(this.isLoading)
        }catch(err){
            this.setState({
                username: undefined
            })
        }
    }

    render() {
        return (
            <div className='main-chatting'>
                {
                    typeof this.state.username == "string" ? (
                        <div className={
                            this.state.theme ? 'chatting-div light' : 'chatting-div dark'
                        }>
                            <div className='message-header'>
                                <button className='theme' onClick={this.changeTheme}>
                                    <FaMoon style={{color: this.state.theme ? '#000' : '#fff'}}/>
                                </button>
                                <p>Username: {this.state.username}</p>

                                <Link to='/' onClick={this.signOut}>Sign Out</Link>
                            </div>

                            {this.state.isLoading ? <Loading /> : (
                                <div className='message-block'>
                                <ReactScrollableFeed className='paddings'>
                                    {
                                        this.state.messages.map((val,i)=>{
                                            return (
                                                <div className={
                                                    this.state.username === val.author ? "message right" : 'message'
                                                } key={i}>
                                                    <div className='message-author'>
                                                        <p>{val.author}</p>
                                                    </div>
                                                    <div className='message-p'  id={
                                                        this.state.username === val.author ? 'me' : 'another'
                                                    }>
                                                    <a className={
                                                        val.image !== undefined && val.image !== null ? "message-a" : "hide"
                                                    } href={val.image} >
                                                        <img className={
                                                            val.image !== undefined && val.image !== null ? "message-a-img" : "hide"
                                                        } src={val.image} alt='' />
                                                    </a>
                                                    
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
                            )}

                            

                            <div className='message-form'>
                            {/* <div className='selected-img-div'>
                                    <h1>HELLO</h1>
                            </div> */}
                                <form className={
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
                                                this.sendMessage(e)
                                            }
                                        }}

                                        ref={this.inputField}
                                    ></textarea>
                                    <div className='ins-div-message-form'>
                                        <label id='inp-img-label' for="inp-img"><FaPaperclip /></label>
                                        <input id="inp-img" type='file' onChange={(e)=>{this.handleImageChange(e)}} ref={this.inputImg} accept="image/*"/>
                                    </div>
                                    <div className='ins-div-message-form'>
                                        <button className='btn-send-message' style={{color: this.state.theme ? '#000' : '#fff'}} type="submit" onClick={(e)=>this.sendMessage(e)}><BiSend /></button>
                                    </div>

                                </form>
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

    componentDidMount(){
        console.log("THIS IS DID")
        this.props.socket.on('recieve_message',async (messages)=>{
            this.setState({
                messages: [...this.state.messages,messages]
            })
        })
    }
}

export default Chat;