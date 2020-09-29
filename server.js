const express = require('express')
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)


//connect to server
io.on('connection', socket =>{
    //send back a user id from socket id
    console.log(socket.id)
    socket.emit("your id", socket.id);
    //when syou send a message you 
    socket.on('send', body =>{
        //message is sent to everyone for display
        io.emit('message', body)
    })







})



server.listen(8000,  () => console.log("server runnng on port 8000"))