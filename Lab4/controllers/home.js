// Controller handler to handle functionality in home page
const Room = require('../models/Rooms')
// Example for handle a get request at '/' endpoint.

// fakeDB = () =>{
//   return [
//     {name:"abcd"},
//     {name:"efgh"},
//     {name:"something"}
//   ]
// }

function getHome(request, response){
  // do any work you need to do, then
  Room.find().lean().then(items => 
    {
      response.render('home', {title: 'home', rooms: items, isAvailable: true});
    })

}

module.exports = {
    getHome
};