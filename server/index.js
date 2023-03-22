const express = require("express");
const cors = require("cors");
const get = require('./api/Get.js');
const post = require('./api/Post.js')
const put = require('./api/Put.js')
const del = require('./api/Delete.js')
const socket = require('socket.io')
const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(3001, () => {
    //Server working in 3001 port
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credential:true
    }
})

global.onlineUsers = new Map(); 

io.on("connection", (socket) => {
    socket.on("addUser", (userID) => {
        onlineUsers.set(userID, socket.id)
    });

    socket.on("sendRequest", (data) => {
        const sendUserSocket = onlineUsers.get(data.Recived_ID)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("requestRecived", data.Sender_ID)
        }
    });

    socket.on("cancelRequest", (data) => {
        const sendUserSocket = onlineUsers.get(data.Recived_ID)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("requestCanceled", data.Sender_ID)
        }
    })
});

app.get('/getFriends/:id', get.getUserFriends);
app.get('/getRequest/:Sender_ID/:Recived_ID', get.getFriendsRequest);
app.post('/addFriend', post.sendFriendRequest);
app.put('/acceptRequest/:id', put.acceptRequest);
app.put('/acceptRequestOrFriendByTheirID/:Sender_ID/:Recived_ID', put.acceptRequestByUsersID);
app.delete('/deleteRequestOrFriend/:id', del.removeRequestOrFriend);
app.delete('/deleteRequestOrFriendByTheirID/:Sender_ID/:Recived_ID', del.removeRequestOrFriendByTheirID);