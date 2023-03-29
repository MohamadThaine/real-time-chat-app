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

export function sendMessage(Chat_ID, Sender_ID, Message, Attached){
    var data = {
        'Chat_ID': Chat_ID,
        'Sender_ID': Sender_ID,
        'Message': Message,
        'Attached': Attached
    }
    fetch("http://localhost:3001/sendMessage", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
    });
}