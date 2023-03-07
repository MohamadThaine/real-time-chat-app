import close from '../Assets/Images/close.png';
import useInput from '../Helper/useInput';
import Hadi from '../Assets/Images/Hadi.png';
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/AddFriend.css'; 
import { useState } from 'react';


function AddFriend(props){
    const [username , usernameInput] = useInput({type: 'text' , placeholder: 'Type username here...' , className: "usernameInput"})
    const [searchResult , setSearchResult] = useState([{img: Hadi, username: 'Hadi Ryad', ID: "12345"},{img: Hadi, username: 'Hadi Ryad', ID: "12345"},{img: Hadi, username: 'Hadi Ryad', ID: "12345"}])
    return(
        <div className='popupBox'>
            <div className='popupWrapper'>
                <img src={close} className="closeIcon" onClick={props.handleClose} />
                {usernameInput}
                <div className='searchResult'>
                    <SearchResult resultList={searchResult} />
                </div>
            </div>
        </div>
    )
}

function SearchResult({resultList}){
   return(
    resultList.map(result => {
        return <User key={result.ID} user={result} />
    })
   )
}

function User({user}){
    return(
        <div className='person'>
            <img src={user.img} />
            <p>{user.username}</p>
            <button>Add Friend</button>
        </div>
    )
}

export default AddFriend