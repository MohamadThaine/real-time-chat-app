import React from 'react'
import Message from './Message'

function Chatmessages({messagesList}){
    return(
        messagesList.map(message =>  {
            return <Message message={message}/>
        })
    )
}

export default Chatmessages;