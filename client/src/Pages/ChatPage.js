import React, { useRef, useState } from 'react';
import facebook from '../Assets/Images/facebook.png';
import gif from '../Assets/Images/gif.png';
import image from '../Assets/Images/image.png';
import send from '../Assets/Images/send.png';
import Hadi from '../Assets/Images/Hadi.png';
import Mohamad from '../Assets/Images/Mohamad.png';
import Logout from '../Assets/Images/logout.png';
import ReportImg from '../Assets/Images/problem-report.png';
import addFriend from '../Assets/Images/add-friend.png';
import ChatMessages from '../Components/ChatMessages';
import ChatList from '../Components/ChatList';
import Report from '../Components/Report';
import '../Assets/Styles/ChatPage.css'; 
import { SignOut } from '../Helper/AccountsManagemnt';


function ChatPage(){
    const messageRef = useRef();
    const [messagesList , setMessagesList] = useState([{recived: true , time:"8:00 PM" ,personImg:Hadi , content:"hello"}]);
    const [chatList , setChatList] = useState([{personImg: Hadi , personName:'Ahmad Thaine' , lastMessage: 'HI' , time: '8:00 PM'} , 
                                             {personImg: facebook , personName:'Facebook Thaine' , lastMessage: 'How are you' , time: '10:00 PM'}]);
    
    const [isReportOpen , setIsReportOpen] = useState(false)
    const handeReport = () => {
        setIsReportOpen(!isReportOpen)
    }
    function sendAMessage(){
        const message = messageRef.current.value;
        if(message == '') return;
        var today = new Date();
        var timeNow = today.getFullYear() + ':' + (today.getMonth() + 1) + ':' + today.getDate() + '  ' + today.getHours() + ':' + today.getMinutes();
        setMessagesList(prevMessages => {
            return [...prevMessages , {recived: false , time:timeNow, content: message}]
        });
        messageRef.current.value = null;
    }

    onkeyup = (e) => {
        if(e.which === 13){
            sendAMessage()
        }
    }
    return <div className="wrapper">
        <div className="chatsContener">
            <div className='chats'>
            <div className='profile'>
                <img src={Mohamad} />
                <p>Mohamad Tahaina</p>
            </div>
                <ChatList chatList={chatList} />
            <div className='tools'>
                <button onClick={SignOut}>
                    <img src={Logout} title='Logout'/>
                </button>
                <button>
                    <img src={ReportImg}  title='Report a problem' onClick={handeReport}/>
                </button>
                <button>
                    <img src={addFriend} title='Add Friend' />
                </button>
            </div>
            </div>
            <div className='openedChat'>
                <div className='messages' id='chatmessages'>
                    <ChatMessages messagesList = {messagesList} />
             </div>
             <div className='chatTool'>
                <button>
                    <img src={gif} />
                </button>
                <button>
                    <img src={image} />
                </button>
                <input type='text' placeholder='Aa' autoComplete='off' ref= {messageRef}  />
                <button onClick={() => sendAMessage()}>
                    <img src={send} />
                </button>
             </div>
            </div>
        </div>
        {isReportOpen && <Report name='Mohamad thaine' email='example.com' handleClose = {handeReport} />}
    </div>
}





export default ChatPage