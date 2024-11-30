"use strict";
// console.log("Hi there");
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// event handler
wss.on("connection", function (socket) {
    console.log("user connected");
    //  setInterval(()=>{
    //     socket.send("curr price of solna is " + Math.random());
    //  },1000);
    // socket.send("hello")
    socket.on("message", (e) => {
        if (e.toString() === "ping") {
            socket.send("Pong");
        }
    });
});
