import close from '../Assets/Images/close.png';
import useInput from '../Helper/useInput';
import Hadi from '../Assets/Images/Hadi.png';
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/AddFriend.css'; 


function AddFriend(props){
    const [username , usernameInput] = useInput({type: 'text' , placeholder: 'Type username here...' , className: "usernameInput"})
    return(
        <div className='popupBox'>
            <div className='popupWrapper'>
                <img src={close} className="closeIcon" onClick={props.handleClose} />
                {usernameInput}
                <div className='searchResult'>
                    <div className='person'>
                        <img src={Hadi} />
                        <p>Hadi-Ryad</p>
                        <button className='addFriendBT'>Add Friend</button>
                    </div>
                    <div className='person'>
                        <img src={Hadi} />
                        <p>Hadi-Ryad</p>
                        <button className='addFriendBT'>Add Friend</button>
                    </div>
                    <div className='person'>
                        <img src={Hadi} />
                        <p>Hadi-Ryad</p>
                        <button className='addFriendBT'>Add Friend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function searchResult(){

}

export default AddFriend