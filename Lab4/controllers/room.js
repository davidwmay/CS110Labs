// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');


// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', {title: 'chatroom', roomName: request.params.roomName, ident: request.params.identifier});
    console.log(request.params.indentifier);
}

module.exports = {
    getRoom
};