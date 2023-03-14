const db = require('../dbConnection');

const getUserFriends = (request, response) => {
    const ID = request.params.id;
    db.pool.query('SELECT * FROM user_friends WHERE ("Sender_ID" = $1) OR ("Recived_ID" = $1) ORDER BY "ID" ASC' , [ID],(error , result) => {
      if(error)
      {
        console.log(error);
        throw error;
      }
      response.status(200).json(result.rows)
    })
  }

  const getFriendsRequest = (request, response) => {
    const Sender_ID = request.params.Sender_ID;
    const Recived_ID = request.params.Recived_ID;
    db.pool.query('SELECT "ID", "isAccepted" FROM user_friends WHERE ("Sender_ID" = $1) AND ("Recived_ID" = $2)' , [Sender_ID, Recived_ID],(error , result) => {
      if(error)
      {
        console.log(error);
        throw error;
      }
      response.json(result.rows[0])
    })
  }

  module.exports = {
    getUserFriends,
    getFriendsRequest
  }