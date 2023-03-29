import close from '../Assets/Images/close.png';
import userPic from '../Assets/Images/user.png';
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/AddFriend.css'; 
import { useEffect, useState } from 'react';
import { auth, db , app } from '../Helper/AccountsManagemnt';
import { sendEmailVerification } from 'firebase/auth';
import { query, collection, getDocs, orderBy, startAt, endAt , limit } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {sendFriendRequest} from '../api/post';
import cancelFriendRequest from '../api/delete';

function AddFriend(props){
    const [username , setUsername] = useState('');
    const [searchResult , setSearchResult] = useState([])
    const [noResult, setNoResult] = useState('');
    const storage = getStorage(app);
    const usersRef = collection(db, "users");
    useEffect(() => {
        async function searchUsers(){
            setSearchResult([]);
            if(username == '') return;
            const getUsers = query(usersRef, orderBy('UsernameSmallLetters'), startAt(username.toLowerCase()), endAt(username.toLowerCase()+'\uf8ff') , limit(5));
            const usersResult = await getDocs(getUsers);
            if(usersResult.docs.length == 0)
            {
                setNoResult('No result found!');
                return;
            }
            else{
                setNoResult('');
            }
            usersResult.forEach((user) => {
                const picRef = ref(storage, 'usersPics/' + user.id + '.png');
                if(auth.currentUser.email === user.data().Email && usersResult.docs.length == 1){setNoResult('No result found!'); return; }
                if(auth.currentUser.email === user.data().Email){return; } 
                getDownloadURL(picRef)
                    .then((url) => {
                        setSearchResult(prevResult => {
                            return [...prevResult , {img:url, username: user.data().Username, ID: user.id }]
                        })
                    }).catch(() => {
                        setSearchResult(prevResult => {
                            return [...prevResult , {img:userPic, username: user.data().Username, ID: user.id }]
                        })
                    });
            });
        }
        const delayDebounceFn = setTimeout(() => {
            searchUsers();
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [username])      
    if(auth.currentUser.providerData[0].providerId != "facebook.com" && auth.currentUser.emailVerified == false){
        return(
            <div className='popupBox'>
                 <div className='popupWrapper'>
                    <img src={close} className="closeIcon" onClick={props.handleClose} />
                    <p>Verify your account first to add friends!</p>
                    <p className='sendVerifyLink' onClick={() => sendEmailVerification(auth.currentUser)}>Send verify link again</p>
                </div>
            </div>
        )
    }

    return(
        <div className='popupBox'>
            <div className='popupWrapper'>
                <img src={close} className="closeIcon" onClick={props.handleClose} />
                <div className='searchWrapper'>
                    <input type='text'className='usernameInput' placeholder='Type username here...' 
                            onChange={e => {setUsername(e.target.value)}} value={username} />
                    <div className='searchResult'>
                        <SearchResult resultList={searchResult} socket={props.socket} />
                        <p className='noResult'>{noResult}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchResult({resultList, socket}){
   if(resultList == null) return;
   return(
    resultList.map(result => {
        return <User key={result.ID} user={result} socket={socket} />
    })
   )
}

function User({user, socket}){
    const [btnText, setBtnText] = useState('Add Friend');
    const [isSending, setIsSending] = useState(true);
    const [requestID, setRequestID] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3001/getRequest/' + auth.currentUser.uid + '/' + user.ID)
        .then((result) => {
            console.log('result is: ' + result);
            result.json()
            .then((data) => {
                setRequestID(data.ID);
                setIsSending(false);
                if(data.isAccepted == true)
                {
                    setBtnText('Delete Friend');
                }
                else{
                    setBtnText('Cancel Request');
                }
            })
        }).catch(() => {
            setRequestID(0);
        })
    },[])
    const handleRequest = () => {
        if(isSending){
            sendFriendRequest(auth.currentUser.uid, user.ID, setRequestID);
            setBtnText('Cancel Request');
            setIsSending(false);
            socket.current.emit("sendRequest",{
                Sender_ID:auth.currentUser.uid,
                Recived_ID:user.ID
            })
        }
        else{
            if(requestID == 0) {return;}
            cancelFriendRequest(requestID);
            setBtnText('Add Friend');
            setIsSending(true);
            socket.current.emit("cancelRequest",{
                Sender_ID:auth.currentUser.uid,
                Recived_ID:user.ID
            })
        }
    }
    console.log('id is: ' + requestID);
    return(
        <div className='person'>
            <img src={user.img} />
            <p>{user.username}</p>
            <button onClick={handleRequest}>{btnText}</button>
        </div>
    )
}

export default AddFriend