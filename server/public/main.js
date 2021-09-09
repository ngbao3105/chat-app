const socket = io.connect("http://localhost:3000");
socket.on("message",(data) =>{
    console.log(data);
    socket.emit("messageFromClient",data);
})