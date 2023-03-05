import React from 'react';

function Message({message}){
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
                <div className='messagecontent'>
                    <p>{message.content}</p>
                </div>
            </div>
        )
    } 
}

export default Message;