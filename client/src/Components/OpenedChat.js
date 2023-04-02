import React, { useEffect, useRef, useState } from 'react'
import gif from '../Assets/Images/gif.png';
import image from '../Assets/Images/image.svg';
import attach from '../Assets/Images/attach.svg';
import send from '../Assets/Images/send.png';
import ChatMessages from './ChatMessages';
import { sendMessage } from '../api/post';
import { auth } from '../Helper/AccountsManagemnt';
import { getChatMessages } from '../api/get';
import { uuidv4 } from '@firebase/util';
function OpenedChat({chat, socket, userImg})
{
    
    const [messagesList , setMessagesList] = useState([]);
    const isTypingRef =useRef();
    const messageRef = useRef();
    const scrollRef = useRef();
    function sendAMessage(){
        const message = messageRef.current.value;
        if(message === '') return;
        var today = new Date();
        var timeNow = today.getFullYear() + ':' + (today.getMonth() + 1) + ':' + today.getDate() + '  ' + today.getHours() + ':' + today.getMinutes();
        setMessagesList(prevMessages => {
            return [...prevMessages , {id: uuidv4(),recived: false , time:timeNow, content: message}]
        });
        sendMessage(chat.chatID, auth.currentUser.uid, messageRef.current.value, '');
        socket.current.emit('messageSent', {
            Chat_ID: chat.chatID,
            Sender_ID: auth.currentUser.uid,
            User_ID: chat.ID,
            UserPic: userImg,
            Message: messageRef.current.value,
            Time: timeNow
        })
        messageRef.current.value = null;
    }

    onkeyup = (e) => {
        if(e.which === 13){
            sendAMessage()
        }
    }

    const userTyping = () => {
        socket.current.emit('userTyping',{
            ID:chat.ID,
            Sender_ID: auth.currentUser.uid
        })
    }

    useEffect(() => {
        setMessagesList([]);
        if(chat == undefined){
            return;
        }
        if(messageRef.current != null){
            messageRef.current.value = null;
        }
        getChatMessages(chat.chatID, chat.ID, chat.personImg,setMessagesList);
    },[chat])

    useEffect(() => {
        if(chat == undefined){
            return;
        }
        socket.current.on('messageRecived', (message) => {
            if(message.Sender_ID != chat.ID){
                return;
            }
            setMessagesList(prevMessages => {
                return [...prevMessages , {id: uuidv4(), recived: true, time: message.Time, content: message.Message, personImg: message.UserPic}]
            })
            isTypingRef.current.className = 'typingInfo';
        })
    }, [chat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto" })
    },[messagesList])

    useEffect(() => {
        if(chat == undefined){
            return;
        }
        socket.current.on('userIsTyping', (user) => {
            if(user.Sender_ID != chat.ID){
                return;
            }
            isTypingRef.current.className = "typingInfo isTyping";
            scrollRef.current?.scrollIntoView({ behavior: "auto" })
            setTimeout(() => {
                isTypingRef.current.className = 'typingInfo';
            },2000)
        })
    },[chat])

    if(chat == undefined){
        return <p className='noChatOpened'>No Chat Opened</p>;
    }
    return(
        <div className='openedChat'>
                <div className='openedChatUserInfo'>
                    <img src={chat.personImg}/>
                    <p>{chat.personName}</p>
                </div>
                <div className='messages' id='chatmessages' >
                    <ChatMessages messagesList = {messagesList} />
                    <div ref={scrollRef}/>
                    <div className='typingInfo' ref={isTypingRef}>
                        <img className='typingUserImg' src={chat.personImg}></img>
                        <p>Typing...</p>
                    </div>
                </div>
                <div className='chatTool'>
                    <button>
                        <img src={attach} alt='send img'/>
                    </button>
                    <input type='text' placeholder='Type a message...' autoComplete='off' ref= {messageRef} onChange={userTyping} />
                    <button onClick={() => sendAMessage()}>
                        <img src={send} alt='send message' />
                    </button>
                </div>
        </div>
    )
}

export default OpenedChat