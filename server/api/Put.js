const db = require('../dbConnection');

const acceptRequest = (request, response) => {
    const ID = parseInt(request.params.id);
    db.pool.query( 'UPDATE user_friends SET "isAccepted" = true WHERE "ID" = $1',[ID],
    (error) => {
        if(error){
            response.status(400).send()
        }
    })
    response.status(200)
}

const acceptRequestByUsersID = (request) => {
    const Sender_ID = request.params.Sender_ID;
    const Recived_ID = request.params.Recived_ID;
    db.pool.query('UPDATE user_friends SET "isAccepted" = true WHERE ("Sender_ID" = $1) AND ("Recived_ID" = $2)' , [Sender_ID, Recived_ID],(error) => {
        if(error)
        {
          throw error;
        }
      })
}

module.exports = {
    acceptRequest,
    acceptRequestByUsersID
}