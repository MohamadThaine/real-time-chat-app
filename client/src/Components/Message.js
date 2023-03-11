import React, { useRef } from 'react';

function Message({message}){
    const msgRef = useRef(null)
    if(message.recived){
        return(
            <div className="recivedMessage" title={message.time}>
                <img src={message.personImg} className='personimg'/>
                <div className='messagecontent recived'>
                        <p>{message.content}</p>
                    </div>
            </div>
        )
    } 
    else{
        return(
            <div className="sentMessage" title={message.time}> 
                <div className='messagecontent' ref={msgRef}>
                    <p>{message.content}</p>
                </div>
            </div>
        )
    } 
}

export default Message;