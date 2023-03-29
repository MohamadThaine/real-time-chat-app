import React, { useEffect, useRef, useState } from 'react'
import gif from '../Assets/Images/gif.png';
import image from '../Assets/Images/image.png';
import send from '../Assets/Images/send.png';
import ChatMessages from './ChatMessages';
import { sendMessage } from '../api/post';
import { auth } from '../Helper/AccountsManagemnt';
import { getChatMessages } from '../api/get';
import { uuidv4 } from '@firebase/util';
function OpenedChat({chat, socket, userImg})
{
    
    const [messagesList , setMessagesList] = useState([]);
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
            
        })
    }, [chat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto" })
    },[messagesList])

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
            </div>
            <div className='chatTool'>
                <button>
                    <img src={gif} alt='sent gif'/>
                </button>
                <button>
                    <img src={image} alt='send img'/>
                </button>
                <input type='text' placeholder='Aa' autoComplete='off' ref= {messageRef}  />
                <button onClick={() => sendAMessage()}>
                    <img src={send} alt='send message' />
                </button>
             </div>
        </div>
    
    )
}

export default OpenedChat