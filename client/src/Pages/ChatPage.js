import React, { useRef, useState } from 'react';
import facebook from '../Assets/Images/facebook.png';
import gif from '../Assets/Images/gif.png';
import image from '../Assets/Images/image.png';
import send from '../Assets/Images/send.png';
import Hadi from '../Assets/Images/Hadi.png';
import Logout from '../Assets/Images/logout.png';
import ReportImg from '../Assets/Images/problem-report.png';
import addFriend from '../Assets/Images/add-friend.png';
import user from "../Assets/Images/user.png"
import ChatMessages from '../Components/ChatMessages';
import ChatList from '../Components/ChatList';
import Report from '../Components/Report';
import Profile from '../Components/Profile';
import '../Assets/Styles/ChatPage.css'; 
import { SignOut } from '../Helper/AccountsManagemnt';
import AddFriend from '../Components/AddFriend';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app , auth } from "../Helper/AccountsManagemnt";


function ChatPage(){
    const [profilePicture , setProfilePicture] = useState(user);
    const getProrfilePicture = () => {
        const storage = getStorage(app);
        const picRef = ref(storage, 'usersPics/' + auth.currentUser.uid + '.png');
        getDownloadURL(picRef)
        .then((url) => {
            setProfilePicture(url);
         });
    }
    getProrfilePicture();
    const messageRef = useRef();
    const [messagesList , setMessagesList] = useState([{recived: true , time:"8:00 PM" ,personImg:Hadi , content:"hello"}]);
    const [chatList , setChatList] = useState([{personImg: Hadi , personName:'Ahmad Thaine' , lastMessage: 'HI' , time: '8:00 PM'} , 
                                             {personImg: facebook , personName:'Facebook Thaine' , lastMessage: 'How are you' , time: '10:00 PM'}]);
    
    const [isReportOpen , setIsReportOpen] = useState(false);
    const [isAddFriendOpen , setIsAddFriendOpen] = useState(false);
    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const handlePopup = (setValue , value) => {
        setValue(!value)
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
            <div className='profile' onClick={() => handlePopup(setIsProfileOpen , isProfileOpen)}>
                <img src={profilePicture} />
                <p>Mohamad Tahaina</p>
            </div>
                <ChatList chatList={chatList} />
            <div className='tools'>
                <button onClick={SignOut}>
                    <img src={Logout} title='Logout'/>
                </button>
                <button>
                    <img src={ReportImg}  title='Report a problem' onClick={() => handlePopup(setIsReportOpen , isReportOpen)}/>
                </button>
                <button>
                    <img src={addFriend} title='Add Friend' onClick={() => handlePopup(setIsAddFriendOpen , isAddFriendOpen)} />
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
        {isReportOpen && <Report name='Mohamad thaine' email='example.com' handleClose = {() => handlePopup(setIsReportOpen , isReportOpen)} />}
        { isAddFriendOpen && <AddFriend handleClose = {() => handlePopup(setIsAddFriendOpen , isAddFriendOpen)} />}
        {isProfileOpen && <Profile img={profilePicture} username='Mohamad Tahaina' fullName='Mohamad Khalid Tahaina' email='example@gmail.com' birthDate='6/10/2000' gender='Male'
                         handleClose = {() => handlePopup(setIsProfileOpen , isProfileOpen)} />}
    </div>
}





export default ChatPage