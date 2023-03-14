import notification from '../Assets/Images/notification.png';
import '../Assets/Styles/Notification.css';  

function Notification({text}){
    return(
        <div className="notification">
            <img src={notification} />
            <p>{text}</p>
        </div>
    )
}

export default Notification