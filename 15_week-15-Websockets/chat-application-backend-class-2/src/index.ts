// // Creating the websocket server 
import {WebSocketServer , WebSocket} from "ws";
const wss = new WebSocketServer({port :8080});
interface User {
    socket : WebSocket;
    room:string
}
let allSockets:User[] = [];

wss.on("connection" , (socket)=>{


    socket.on("message" , (message)=>{
    //    {} yaha per string aaygi esko object main convert karna padega 
      const parsedMessage = JSON.parse(message as unknown as string);

      if(parsedMessage.type === "join" ){ // user join karna cahata hai 
        allSockets.push({
            socket ,
            room:parsedMessage.payload.roomId
        })
      }

      if(parsedMessage.type === "chat" ){ // user chat karna cahata hai 
         const currUserRoom = allSockets.find((x)=> x.socket == socket)?.room;
         for(let i = 0 ; i<allSockets.length ; i++){
            if(allSockets[i].room == currUserRoom){
                allSockets[i].socket.send(parsedMessage.payload.message);
            }
         }
      }
        
    })
    
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