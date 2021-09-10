const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  OBJECT_ID
} = require('../settings/mongodb.settings');
const {
  formatData
} = require("../utils/utils");
const {
  userJoin,
  getUser
} = require("../utils/users");
let currentUser = {};
let currentChannel = [];
const registerSocketServerEventHandlers = (socketServer) => {
  socketServer.on("connection", (socket) => {
    socket.on('joinRoom', ({
      user,
      channel
    }) => {
      currentChannel[socket.id] = channel;
      socket.join(currentChannel[socket.id].channelName);
      currentUser = getUser(user._id);
      if (currentUser == undefined || currentUser == null || currentUser == {}) {
        currentUser = userJoin(user);
        socket.broadcast.emit("admin-message",`Welcome <b>${currentUser.userName}</b> to ${currentChannel[socket.id].channelName}`);
        //Boardcast when a user connects
      }
      socket.to(currentChannel[socket.id].channelName).emit("admin-message", `<b>${currentUser.userName}</b> has joined the channel`);
    })
    socket.on("chatMessage", (data) => {
      socketServer.to(currentChannel[socket.id].channelName).emit("message", formatData(data))
    })
    //Notify to room 
    socket.on("disconnect", () => {
      console.log(socketServer);
      socketServer.to(currentChannel[socket.id].channelName).emit("admin-message", `${currentUser.userName} has left`);
    })

  })
}

module.exports = {
  registerSocketServerEventHandlers
}
