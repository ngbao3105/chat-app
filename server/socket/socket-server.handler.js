const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  OBJECT_ID
} = require('../settings/mongodb.settings');
const {
  formatMessage
} = require("../utils/utils");
const {
  userJoin,
  getUser
} = require("../utils/users");
const botName = "Chat Bot";
let currentUser = {};
let currentChannel = {};
const registerSocketServerEventHandlers = (socketServer) => {
  socketServer.on("connection", (socket) => {
    socket.on('joinRoom', ({
      user,
      channel
    }) => {
      currentChannel = channel;
      socket.join(currentChannel.channelId);
      currentUser = getUser(user.userId);
      if (currentUser == undefined || currentUser == null || currentUser == {}) {
        currentUser = userJoin(user);
        socket.emit("admin-message", formatMessage(botName, `Welcome <b>${currentUser.userName}</b> to ${currentChannel.channelId}`));
        //Boardcast when a user connects
      }
      socket.broadcast.to(currentChannel.channelId).emit("admin-message", formatMessage(botName, `<b>${currentUser.userName}</b> has joined the channel`))
    })
    socket.on("chatMessage", async (data) => {
      try {
        socketServer.emit("message", formatMessage(currentUser.userName, data))
      } catch (error) {
        socket.emit("message", 400);
      };
    })
    //Notify to room 
    socket.on("disconnect", () => {
      socket.broadcast.to(currentChannel.channelId).emit("admin-message", formatMessage(botName, `${currentUser.userName} has left`));
    })

  })
}

module.exports = {
  registerSocketServerEventHandlers
}
