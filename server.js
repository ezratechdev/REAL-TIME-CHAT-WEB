const express = require('express');
const http = require('http');
const app = express();
const Server = http.createServer(app);
const io = require('socket.io')(Server);
const PORT = process.env.PORT || 5000;
//MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
//get
app.get("/",(req,res)=> res.sendFile(__dirname + "/html/index.html"));
app.get("/chat",(req,res)=>  res.sendFile(__dirname +"/html/chat.html"));
//post
app.post("/",(req,res)=>{
    res.redirect("/chat");
});
//
io.on("connect",socket =>{
    var users = {};
    socket.on("new-user",name => {
        socket.broadcast.emit("new-user",`${name} joined the chat 😊`);
    });
    socket.on("texts",({text,name}) =>{
        users[socket.id] = name;
        socket.broadcast.emit("texts",{text,name});
    });
    socket.on("disconnect",()=>{
        if(users[socket.id] != undefined){
            socket.broadcast.emit("left",`${users[socket.id]} just left the chat 😞`);
        }
        delete users[socket.id];
    });
});
//
Server.listen(PORT,(err)=>{
    if(err) console.log(err)
    console.log(`SERVER IS UP ON : ${PORT}`);
});