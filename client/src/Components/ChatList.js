import React from 'react'
function ChatList({chatList, setOpenedChat}){
    return(
        chatList.map(chat => {
            return <Chat key={chat.ID} chat={chat} setOpenedChat ={setOpenedChat} />
        })
    )
}

function Chat({chat, setOpenedChat}){
    return(
        <div className="chat" onClick={() => setOpenedChat(chat)}>
            <img src={chat.personImg} />
            <div className="LastMesssage">
            <p>{chat.personName}</p>
            <p>{chat.lastMessage} {chat.time}</p>
            </div>
        </div>
    )
    
}

export default ChatList