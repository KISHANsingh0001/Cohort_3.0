"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // Creating the websocket server 
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        //    {} yaha per string aaygi esko object main convert karna padega 
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") { // user join karna cahata hai 
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") { // user chat karna cahata hai 
            const currUserRoom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
// import { WebSocketServer,WebSocket } from "ws";
// const wss = new WebSocketServer({port:8080});
// let allSockets:WebSocket[] = [];
// wss.on("connection" , (socket)=>{
//    allSockets.push(socket);
//    socket.on("message" , (message)=>{
//       for(let i = 0 ; i<allSockets.length ; i++){
//         const s = allSockets[i];
//         s.send(message.toString());
//       }
//    })
//    socket.on("disconnect" , ()=>{
//     allSockets = allSockets.filter(x => x != socket);
//    })
// })
