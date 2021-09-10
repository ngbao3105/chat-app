const users = [
    {"_id":"Joyse","userName":"Joyse"},
    {"_id":"Russell","userName":"Russell"},
    {"_id":"Sam","userName":"Sam"}
]

//Join user to chat

const userJoin = (user) => {
    users.push(user);
    return user;
}

//Get current user 
const getUser = (id) => {
    return users.find(user => user._id == id);
}


module.exports = {
    userJoin,
    getUser
}