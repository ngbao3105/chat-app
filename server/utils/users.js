const users = [
    {"userId": "Joyse","userName":"Joyse","avatar":""},
    {"userId": "Russel","userName":"Russel","avatar":""},
    {"userId": "Sam","userName":"Sam","avatar":""}
]

//Join user to chat

const userJoin = (id,userName,channelName) => {
    const user = {id, userName, channelName};
    users.push(user);
    return user;
}

//Get current user 
const getUser = (id) => {
    return users.find(user => user.userId == id);
}


module.exports = {
    userJoin,
    getUser
}