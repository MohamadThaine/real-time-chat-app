export function sendFriendRequest(Sender_ID, Recived_ID, setRequestID){
    var data = {
        'Sender_ID': Sender_ID,
        'Recived_ID': Recived_ID
    }
    fetch("http://localhost:3001/addFriend",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
    }).then((result) => {
        result.json()
        .then((data) => {
            setRequestID(data.ID);
        })
    })
    .catch((error) => console.log(error));
}

export default sendFriendRequest;