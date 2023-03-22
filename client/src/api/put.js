import { auth } from "../Helper/AccountsManagemnt";

function acceptFriendRequest(targetedRequestID, userID){
    fetch('http://localhost:3001/acceptRequest/' + targetedRequestID, {
        method: 'PUT'
    }).then((response) => {
            if(response.status == 400){
                acceptFriendRequestByUsersID(userID);
            }
        });
}

function acceptFriendRequestByUsersID(userID){
    fetch('http://localhost:3001/acceptRequestOrFriendByTheirID/' + userID + '/' + auth.currentUser.uid, {
        method: 'PUT'
    });
}

export default acceptFriendRequest