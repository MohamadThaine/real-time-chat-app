import { auth } from "../Helper/AccountsManagemnt";

function cancelFriendRequest(targetedRequestID, userID){
    fetch('http://localhost:3001/deleteRequestOrFriend/' + targetedRequestID, {
        method: 'DELETE'
    }).then((response) => {
        if(response.status == 400){
            cancelFriendRequestByUsersID(userID);
        }
    });
}

function cancelFriendRequestByUsersID(userID){
    console.log("Sender_ID:" + userID + "\nRecived_ID:" + auth.currentUser.uid);
    fetch('http://localhost:3001/deleteRequestOrFriendByTheirID/' + userID + '/' + auth.currentUser.uid, {
        method: 'DELETE'
    });
}

export default cancelFriendRequest