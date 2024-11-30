// console.log("Hi there");

import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
// event handler
wss.on("connection", function (socket) {
    console.log("user connected");
    //  setInterval(()=>{
    //     socket.send("curr price of solna is " + Math.random());
    //  },1000);
    // socket.send("hello")
    socket.on("message" , (e)=>{
       if(e.toString() === "ping"){
         socket.send("Pong");
       }
        
    })
})



