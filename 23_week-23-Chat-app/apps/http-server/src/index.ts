import express from "express";      
const app = express();

app.get("/chat" , (req , res)=>{
    res.send("Welcome to chat page");
})

app.listen(3001);