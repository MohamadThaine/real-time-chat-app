import React from 'react'
import Message from './Message'

function Chatmessages({messagesList}){
    return(
        messagesList.map(message =>  {
            return <Message key={message.id} message={message}/>
        })
    )
}

export default Chatmessages;