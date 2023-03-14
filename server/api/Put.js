const db = require('../dbConnection');

const acceptRequest = (request, response) => {
    const ID = parseInt(request.params.id);
    db.pool.query( 'UPDATE user_friends SET "isAccepted" = true WHERE "ID" = $1',[ID],
    (error) => {
        if(error){
            throw error;
        }
    })
    response.status(200)
}

module.exports = {
    acceptRequest
}