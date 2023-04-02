import React, { useEffect, useRef, useState } from 'react'
function ChatList({chatList, setOpenedChat}){
    return(
        chatList.map(chat => {
            return <Chat key={chat.ID} chat={chat} setOpenedChat ={setOpenedChat} />
        })
    )
}

function Chat({chat, setOpenedChat}){
    const [personNameSplit, setPersonName] = useState('');
    useEffect(() => {
        const fullName = chat.personName.split(" ");
        if(fullName.length < 3){
            setPersonName(chat.personName);
            return;
        }
        setPersonName(fullName[0] + ' ' + fullName[2])
    },[])
    return(
        <div className="chat" onClick={() => setOpenedChat(chat)}>
            <img src={chat.personImg} />
            <div className="chatInfo">
            <p>{personNameSplit}</p>
            <div className='lastMessageDetalis'>
                <p>{chat.lastMessage}</p>
                <p>{chat.time}</p>
            </div>
            </div>
        </div>
    )
    
}

export default ChatList