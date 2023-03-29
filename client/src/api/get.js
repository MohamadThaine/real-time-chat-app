import { auth } from "../Helper/AccountsManagemnt"

export function getChatMessages(Chat_ID, UserID, UserPic,setMessagesList){
    fetch('http://localhost:3001/getMessages/' + Chat_ID)
    .then((messagesList) => messagesList.json())
    .then((data) => {
        data.forEach((message) => {
            const messageDate = new Date(message.Time).toLocaleString('en-US', { hour12: true });
            if(message.UserID == auth.currentUser.uid){
                setMessagesList(prevMessages => {
                    return [...prevMessages, {id: message.ID, recived: false, time:messageDate, content: message.Message}]
                })
            }
            else{
                setMessagesList(prevMessages => {
                    return [...prevMessages, {id: message.ID ,recived: true, time:messageDate, content: message.Message, personImg: UserPic}]
                })
            }
        })
    })
}