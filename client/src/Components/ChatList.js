import React from 'react'
function ChatList({chatList}){
    return(
        chatList.map(chat => {
            return <Chat chat={chat} />
        })
    )
}

function Chat({chat}){
    return(
        <div className="chat">
            <img src={chat.personImg} />
            <div className="LastMesssage">
            <p>{chat.personName}</p>
            <p>{chat.lastMessage} {chat.time}</p>
            </div>
        </div>
    )
    
}

export default ChatList