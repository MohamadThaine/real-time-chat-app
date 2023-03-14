import React, {  useEffect, useRef, useState } from 'react';
import facebook from '../Assets/Images/facebook.png';
import gif from '../Assets/Images/gif.png';
import image from '../Assets/Images/image.png';
import send from '../Assets/Images/send.png';
import Hadi from '../Assets/Images/Hadi.png';
import Logout from '../Assets/Images/logout.png';
import ReportImg from '../Assets/Images/problem-report.png';
import addFriend from '../Assets/Images/add-friend.png';
import FriendRequests from '../Assets/Images/friend-request.png';
import user from "../Assets/Images/user.png"
import ChatMessages from '../Components/ChatMessages';
import ChatList from '../Components/ChatList';
import Report from '../Components/Report';
import Profile, { currentImg } from '../Components/Profile';
import '../Assets/Styles/ChatPage.css'; 
import { getUserData, SignOut } from '../Helper/AccountsManagemnt';
import AddFriend from '../Components/AddFriend';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app , auth , getCurrentUserInfo } from "../Helper/AccountsManagemnt";
import { io } from "socket.io-client"
import Loading from '../Components/Loading';
import FriendRequest from '../Components/FriendsRequset';
import { uuidv4 } from '@firebase/util';

function ChatPage(){
    const socket = useRef();
    const [profilePicture , setProfilePicture] = useState(user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messageRef = useRef();
    const [messagesList , setMessagesList] = useState([{recived: true , time:"8:00 PM" ,personImg:Hadi , content:"hello"}]);
    const [chatList , setChatList] = useState([{ID: 12, personImg: Hadi , personName:'Ahmad Thaine' , lastMessage: 'HI' , time: '8:00 PM'} , 
                                             {ID: 13, personImg: facebook , personName:'Facebook Thaine' , lastMessage: 'How are you' , time: '10:00 PM'}]);
    const [requestList, setRequestsList] = useState([]);
    const [isReportOpen , setIsReportOpen] = useState(false);
    const [isAddFriendOpen , setIsAddFriendOpen] = useState(false);
    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const [isFriendRequestOpen, setIsFriendRequestOpen] = useState(false);
    const getProrfilePicture = () => {
        const storage = getStorage(app);
        const picRef = ref(storage, 'usersPics/' + auth.currentUser.uid + '.png');
        getDownloadURL(picRef)
        .then((url) => {
            setProfilePicture(url);
         });
    }
    
    useEffect(() => {
        getProrfilePicture();
    }, [currentImg])

    useEffect(() => {
        getCurrentUserInfo(setUsername, setEmail, setFullName, setGender, setBirthDate , setIsLoading);
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/getFriends/' + auth.currentUser.uid)
        .then((friendsList) => friendsList.json())
        .then((data) => {
            data.forEach((user) => {
                if(user.isAccepted == false && user.Sender_ID == auth.currentUser.uid) { return; }
                var ID;
                if(user.Sender_ID == auth.currentUser.uid)
                {
                    ID = user.Recived_ID;
                }
                else{
                    ID = user.Sender_ID;
                }
                getUserData(ID, setChatList, user.isAccepted, setRequestsList, user.ID);
            });
        });
      }, [])  
    
      useEffect(() => {
        socket.current = io("http://localhost:3001")
        socket.current.emit("addUser", auth.currentUser.uid);
      },[])

      useEffect(() =>{
            socket.current.on("requestRecived",(request) => {
                getUserData(request, setChatList, false, setRequestsList, uuidv4());
            })
      },[])

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
                <p>{username}</p>
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
                <button className='friendRequestBT'>
                    <img src={FriendRequests} title='Friend Requests' onClick={() => handlePopup(setIsFriendRequestOpen, isFriendRequestOpen)}></img>
                    <p>{requestList.length}</p>
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
        {isReportOpen && <Report name={username} email={email} handleClose = {() => handlePopup(setIsReportOpen , isReportOpen)} />}
        { isAddFriendOpen && <AddFriend friendsList={chatList} handleClose = {() => handlePopup(setIsAddFriendOpen , isAddFriendOpen)} socket={socket}/>}
        {isProfileOpen && <Profile img={profilePicture} username={username} fullName={fullName} email={email} birthDate={birthDate} gender={gender}
                         handleClose = {() => handlePopup(setIsProfileOpen , isProfileOpen)} />}
        {isFriendRequestOpen && <FriendRequest requestsList={requestList} updateRequestsList={setRequestsList} handleClose = {() => handlePopup(setIsFriendRequestOpen , isFriendRequestOpen)}/>}
        {isLoading && <Loading />}
    </div>
}





export default ChatPage