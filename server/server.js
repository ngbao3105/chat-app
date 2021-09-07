const mongo = require("mongodb").MongoClient;
// const express = require('express');
const PORT = 4000 || process.env.PORT;
const io = require('socket.io')();
const client = io.listen(PORT).sockets;

// Connection URL
const url = 'mongodb://localhost:27017/chatroom';
//Connect to mongodb
mongo.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    client.on("connection", socket => {
        let chats = db.collection('chats');
        console.log("socket connected");
        //Create function to send status------------------------------------
        sendStatus = (status) => {
            socket.emit(status);
        }
        console.log("socket connected");

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
            console.log(data);
            const { name, message, channel, createdAt } = data;
            if (name == '' || message == '' || channel == '') {
                sendStatus('Please enter enter name or message or channel');
            } else {
                //Insert data to mongodb
                chat.insert({ name: name, message: message, channel: channel, createdAt: createdAt }, () => {
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

