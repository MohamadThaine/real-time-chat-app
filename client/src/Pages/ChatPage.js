import React, {  useEffect, useRef, useState } from 'react';
import Logout from '../Assets/Images/logout.svg';
import ReportImg from '../Assets/Images/problem-report.svg';
import addFriend from '../Assets/Images/add-friend.svg';
import FriendRequests from '../Assets/Images/friend-request.svg';
import user from "../Assets/Images/user.png"
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
import Notification from '../Components/Notification';
import OpenedChat from '../Components/OpenedChat';
import useInput from '../Helper/useInput';

function ChatPage(){
    const socket = useRef();
    const [profilePicture , setProfilePicture] = useState(user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [chatList , setChatList] = useState([]);
    const [requestList, setRequestsList] = useState([]);
    const [isReportOpen , setIsReportOpen] = useState(false);
    const [isAddFriendOpen , setIsAddFriendOpen] = useState(false);
    const [isProfileOpen , setIsProfileOpen] = useState(false);
    const [isFriendRequestOpen, setIsFriendRequestOpen] = useState(false);
    const [notificationRecived, setNotificationRecived] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [openedChat , setOpenedChat] = useState();
    const [searchChat, searchChatInput] = useInput({type: 'text', placeholder: '🔍 | Type to search', className: 'searchChat'})
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
                if(user.isAccepted === false && user.Sender_ID === auth.currentUser.uid) { return; }
                var ID;
                if(user.Sender_ID === auth.currentUser.uid)
                {
                    ID = user.Recived_ID;
                }
                else{
                    ID = user.Sender_ID;
                }
                getUserData(ID, setChatList, user.isAccepted, setRequestsList, user.ID, user.ChatID)
            });
        })
      }, [])  
      
      useEffect(() => {
        socket.current = io("http://localhost:3001")
        socket.current.emit("addUser", auth.currentUser.uid);
      },[])

      useEffect(() =>{
            socket.current.on("requestRecived",(request) => {
                getUserData(request, setChatList, false, setRequestsList, uuidv4()).then((username) => {
                    setNotificationText(username + " sent you a friend request");
                    setNotificationRecived(true);
                })
                setTimeout(() => {
                    setNotificationRecived(false);
                },3000)
            })
      },[])

      useEffect(() => {
        socket.current.on("requestCanceled",(userID) => {
            setRequestsList(requestList.filter(request => request.ID !== userID))
        })
      },[])

    const handlePopup = (setValue , value) => {
        setValue(!value)
    }

    return <div className="wrapper">
        <div className="chatsContener">
            <div className='chats'>
            <div className='usertools' >
                <img src={profilePicture} alt='profile picture'
                     onClick={() => handlePopup(setIsProfileOpen , isProfileOpen)}/>
                <button onClick={() => handlePopup(setIsAddFriendOpen , isAddFriendOpen)}>
                    <img src={addFriend} title='Add Friend' alt='add friend' />
                </button>
                <button className='friendRequestBT' onClick={() => handlePopup(setIsFriendRequestOpen, isFriendRequestOpen)}>
                    <img src={FriendRequests} title='Friend Requests' alt='friend requests' />
                    <p>{requestList.length}</p>
                </button>
                <button onClick={() => handlePopup(setIsReportOpen , isReportOpen)}>
                    <img src={ReportImg}  title='Report a problem' alt='report a problem' />    
                </button>
                <button onClick={SignOut}>
                    <img src={Logout} title='Logout' alt='logout' className='logoutImg'/>
                </button>
            </div>
                <div className='chatList'>
                    {searchChatInput}
                    <ChatList chatList={chatList} setOpenedChat={setOpenedChat}/>
                </div>
                
            </div>
            <OpenedChat chat={openedChat} socket={socket} userImg={profilePicture} />
        </div>
        {isReportOpen && <Report name={username} email={email} handleClose = {() => handlePopup(setIsReportOpen , isReportOpen)} />}
        { isAddFriendOpen && <AddFriend friendsList={chatList} handleClose = {() => handlePopup(setIsAddFriendOpen , isAddFriendOpen)} socket={socket}/>}
        {isProfileOpen && <Profile img={profilePicture} username={username} fullName={fullName} email={email} birthDate={birthDate} gender={gender}
                         handleClose = {() => handlePopup(setIsProfileOpen , isProfileOpen)} />}
        {isFriendRequestOpen && <FriendRequest requestsList={requestList} updateRequestsList={setRequestsList} handleClose = {() => handlePopup(setIsFriendRequestOpen , isFriendRequestOpen)} updateChatList = {setChatList}/>}
        {notificationRecived && <Notification text={notificationText} />}
        {isLoading && <Loading />}
    </div>
}

export default ChatPage