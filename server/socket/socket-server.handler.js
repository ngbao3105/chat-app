const registerSocketServerEventHandlers = (socketServer) => {
    socketServer.on("connection", (socket) => {
        if (err) {
            throw err;
        }
        socket.emit("message", { many: "hey! how are you!" });
        socket.on("disconnect",(userName)=>{
            socket.emit("mesage",`${userName} left`);
        })
        socket.on("reconnect",(userName)=>{
            //query user history in roomchat by username
        })
    })
}
module.exports = {
    registerSocketServerEventHandlers
}
