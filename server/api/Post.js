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

module.exports = {
    sendFriendRequest
}