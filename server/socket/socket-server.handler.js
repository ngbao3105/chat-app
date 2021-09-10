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
  getCurrentUser
} = require("../utils/users");
const botName = "Chat Bot";

const registerSocketServerEventHandlers = (socketServer) => {
  let users = [];
  let channels = [];
  socketServer.on("connection", (socket) => {
    socket.on('joinRoom', ({
      userName,
      channelName
    }) => {
      const user = userJoin(socket.id, userName, channelName);
      users[socket.id] = userName;
      channels[socket.id] = channelName;
      socket.join(user.channelName);

      socket.emit("admin-message", formatMessage(botName, `Welcome <b>${user.userName}</b> to ${user.channelName}`));

      //Boardcast when a user connects
      socket.broadcast.to(user.channelName).emit("admin-message", formatMessage(botName, `<b>${user.userName}</b> has joined the channel`))


    })
    socket.on("chatMessage", async (data) => {
      try {
        socketServer.emit("message", formatMessage(users[socket.id], data))
      } catch (error) {
        socket.emit("message", 400);
      };
    })
    //Notify to room 
    socket.on("disconnect", () => {
      socket.broadcast.to(channels[socket.id]).emit("admin-message", formatMessage(botName, `${users[socket.id]} has left`));
    })

  })
}

module.exports = {
  registerSocketServerEventHandlers
}
