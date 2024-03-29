import close from '../Assets/Images/close.png';
import changePic from '../Assets/Images/changeProfilePic.png';
import useInput from "../Helper/useInput"
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/Profile.css'; 
import { useState } from 'react';
import ChangeProfilePicture from '../Helper/ChangeProfilePicture';
import { updatePassword } from 'firebase/auth';
import { auth } from '../Helper/AccountsManagemnt';

export var [currentImg , SetImg] = '';

function Profile(props){
    
    const [password , passwordInput] = useInput({type: 'password' , placeholder: 'Type new password here...'});
    [currentImg , SetImg] = useState(props.img);
    const [passwordChangedResult , setResult] = useState('');
    const [uploadStatus ,setUploadStatus] = useState('');
    const changeOldPic = (newImg) =>{
        var Pic = new Image();
        var ImgUrl = (URL.createObjectURL(newImg));
        Pic.onload = function() {
            if(this.width < 128 || this.height < 128){
                setUploadStatus('Picture must be 128px * 128px at least!');
            }
            else{
                SetImg(URL.createObjectURL(newImg));
                ChangeProfilePicture(newImg , setUploadStatus);
            }
            URL.revokeObjectURL(ImgUrl);
        };
        Pic.src = ImgUrl;
    }

    function updateUserPassword(){
        if(password === ''){
            setResult('New password cant be empty!');
            return;
        }
        updatePassword(auth.currentUser , password).then(() => {
            setResult('Password has been changed');
        }).catch((error) => {
            setResult(error);
        });
       
    }

    return(
        <div className="popupBox">
            <div className="popupWrapper">
                <img src={close} className="closeIcon" onClick={props.handleClose} alt='close profile'/>
                <div className='profileDataWrapper'>
                    <div className='img'>
                        {currentImg && <img src={currentImg} className="userImg" alt='Your current profile picture'/>}
                        <label htmlFor='uploadInput'>
                            <img src={changePic} alt='Change picture'/>
                        </label>  
                        <input type='file' id='uploadInput' className='uploadImg' title='' onChange={e => changeOldPic(e.target.files[0])} accept="image/*"/> 
                        
                    </div>
                    <p className='uploadStatus'>{uploadStatus}</p>
                    <p className='profileUsername'>{props.username}</p>
                    <div className="infoSections">
                        <div className="section">
                            <p>Name: {props.fullName}</p>
                            <p>Gender: {props.gender}</p>
                            {passwordInput}
                        </div>
                        <div className="section">
                            <p>Email: {props.email}</p>
                            <p>Birthdate: {props.birthDate}</p>
                            <button className='confirmPasswordBT' onClick={updateUserPassword}>Confirm</button>
                        </div>
                    </div>
                    <div className='passwordChagnedResult'>{passwordChangedResult}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile