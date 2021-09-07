const mongo = require("mongodb").MongoClient;
// const express = require('express');
const PORT = 3000 || process.env.PORT;
const io = require('socket.io')();
io.listen(PORT);

// Connection URL
const url = 'mongodb://localhost:27017/chatroom';
//Connect to mongodb
mongo.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    io.on("connection", socket => {
        let chats = db.collection('chats');

        //Create function to send status------------------------------------
        sendStatus = (status) => {
            socket.emit(status);
        }

        //Get chats from mongo collection -- graphql---------------------
        chats.find().limit(100).sort({ _id: 1 }).toArray((err, results) => {
            if (err) {
                throw err;
            }

            //Emit the messages
            socket.emit("output", results);
        })

        //Handle Input event----------------------------------------------
        socket.on("input", (data) => {
            //{name,message,channel,createdAt,userId,createdBy}
            const { name, message, channel, createdAt, createdById } = data;
            if (name == '' || message == '' || channel == '') {
                sendStatus('Please enter enter name or message or channel');
            } else {
                //Insert data to mongodb
                chat.insert({ name: name, message: message, channel: channel, createdAt: createdAt, createdById: createdById }, () => {
                    io.emit("output", data);
                    sendStatus({ message: "Message Sent.", clear: true });
                });
            }
        });

        //Remove chats from the collection
        socket.on("clear",(data)=>{
            chat.remove({}, ()=>{
                //Emit cleared
                socket.emit("clear");
            })
        })
    })
})

