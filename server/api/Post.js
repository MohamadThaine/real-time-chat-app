const { request, response } = require('express');
const db = require('../dbConnection');

const sendFriendRequest = (request , response) =>{
    const {Sender_ID, Recived_ID} = request.body;
    const currentTime = new Date();
    db.pool.query('INSERT INTO user_friends ("Sender_ID", "Recived_ID", "Send_Date", "isAccepted") VALUES ($1, $2, $3, false) RETURNING "ID"', [Sender_ID, Recived_ID, currentTime], (error, results) => {
        if (error) {
          throw error
        }
        response.json({ID: results.rows[0].ID})
      })
}

const sendMessage = (request, response) => {
  const {Chat_ID, Sender_ID, Message, Attached} = request.body;
  const currentTime = new Date();
  db.pool.query('INSERT INTO message("ChatID", "UserID", "Message", "Attached", "Time", "Seen") VALUES ($1, $2, $3, $4, $5, false) RETURNING "ID"', [Chat_ID, Sender_ID, Message, Attached, currentTime]), (error, result) => {
    if(error){
      throw error;
    }
    response.json({ID: result.rows[0].ID})
  }
}

module.exports = {
    sendFriendRequest,
    sendMessage
}