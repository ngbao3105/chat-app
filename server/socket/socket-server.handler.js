const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  OBJECT_ID
} = require('../settings/mongodb.settings');
const registerSocketServerEventHandlers = (socketServer) => {
  socketServer.on("connection", (socket) => {
    socket.on('joinRoom', ({
      userName,
      room
    }) => {
      socket.join(room);
      socket.emit("message", "hi there!");
    })

    socket.on("chatMessage", async (data) => {
      /** 
       *   chatRoomId: String!,
       *   content: String!,
       *   createdBy: User!,
       *   createdAt: String!,
       */
      try {
        // const client = new MONGODB_CLIENT(MONGODB_URI, {
        //   ...MONGODB_CLIENT_OPTIONS
        // });
        // await client.connect();
        // const db = client.db(MONGODB_DB_NAME);
        // const result = await db.collection('messages').insertOne(data);
        // client.close();
        // socket.emit("message", result);
        console.log(data);
        socketServer.emit("message", data)
      } catch (error) {
        socketServer.emit("message", 400);
      };
    })

    socket.on("disconnect", (userName) => {
      socketServer.emit("message", `${userName} left`);
    })

  })
}

module.exports = {
  registerSocketServerEventHandlers
}
