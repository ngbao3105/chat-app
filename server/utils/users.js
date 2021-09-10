const users = [];

//Join user to chat

const userJoin = (id,userName,channelName) => {
    const user = {id, userName, channelName};
    users.push(user);
    return user;
}

//Get current user 
const getCurrentUser = (id) => {
    return users.find(user => user.id == id);
}


module.exports = {
    userJoin,
    getCurrentUser
}