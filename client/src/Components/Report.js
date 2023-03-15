import React, {useRef, useState } from "react";
import close from '../Assets/Images/close.png';
import '../Assets/Styles/Popup.css'; 
import '../Assets/Styles/Report.css'; 
import useInput from '../Helper/useInput';
import { browserName, browserVersion } from "react-device-detect";
import emailjs from '@emailjs/browser';

function Report(props){
    const [title , titleInput] = useInput({type: 'text' , placeholder: 'Problem title' , className: 'titleInput'})
    const [description , setDescription] = useState('')
    const statusRef = useRef(null)
    var EmailJsTemplateParams = {
        from_name: props.name,
        Title: title,
        Browser_Name: browserName,
        BrowserVersion: browserVersion,
        Email: props.email,
        Description: description
    };
    const sendReport = (e) => {
        if(title == '' || description == ''){ return; }
        e.preventDefault();
        emailjs.send(process.env.React_APP_EmailJsServiceID , process.env.React_APP_EmailJsTemplateID , EmailJsTemplateParams ,  process.env.React_APP_EmailJs_API_KEY)
        .then(() => {
            statusRef.current.innerText = 'Report has been sent we will content you by email within 48 hours';
            statusRef.current.className = 'reportStatus succesfullReport';
        }).catch((error) => {
            statusRef.current.innerText = 'Report has not been sent error code:' + error.code;
            statusRef.current.className = 'reportStatus failedReport';
        })
    }

    return(
        <div className="popupBox">
            <div className="popupWrapper">
                <img src={close} className="closeIcon" onClick={props.handleClose} />
                <div className="content">
                    <p>Descripe the problem you are having</p>
                    {titleInput}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className='descriptionInput' placeholder="Problem description"/>
                    <button onClick={sendReport}>
                        <p>Submit</p>
                    </button>
                    <p className="reportStatus" ref={statusRef}></p>
                </div>
            </div>
        </div>
        
    )
}

export default Report;