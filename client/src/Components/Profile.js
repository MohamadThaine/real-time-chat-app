import close from '../Assets/Images/close.png';
import useInput from "../Helper/useInput"
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/Profile.css'; 

function Profile(props){
    const [password , passwordInput] = useInput({type: 'password' , placeholder: 'Type new password here...'})
    return(
        <div className="popupBox">
            <div className="popupWrapper">
                <img src={close} className="closeIcon" onClick={props.handleClose} />
                <div className='profileDataWrapper'>
                    <img src={props.img} className="userImg"/>
                    <p>{props.username}</p>
                    <div className="infoSections">
                        <div className="section">
                            <p>Name: {props.fullName}</p>
                            <p>Gender: {props.gender}</p>
                            {passwordInput}
                        </div>
                        <div className="section">
                            <p>Email: {props.email}</p>
                            <p>Birthdate: {props.birthDate}</p>
                            <button>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile