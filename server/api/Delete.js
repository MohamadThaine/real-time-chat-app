const { response } = require('express');
const db = require('../dbConnection');

const removeRequestOrFriend = (request, response) => {
    const ID = request.params.id
    db.pool.query('DELETE FROM user_friends WHERE "ID" = $1', [ID], (error, result) => {
        if (error) {
          response.status(400).send();
          return;
        }
        if(result.rowCount == 0)
        {
            response.status(400).send();
        }
    });
}

const removeRequestOrFriendByTheirID = (request, response) => {
    const Sender_ID = request.params.Sender_ID;
    const Recived_ID = request.params.Recived_ID;
    db.pool.query('DELETE FROM user_friends WHERE ("Sender_ID" = $1) AND ("Recived_ID" = $2)' , [Sender_ID, Recived_ID],(error) => {
        if(error)
        {
          console.log(error);
          throw error;
        }
      })
}
module.exports = {
    removeRequestOrFriend,
    removeRequestOrFriendByTheirID
}