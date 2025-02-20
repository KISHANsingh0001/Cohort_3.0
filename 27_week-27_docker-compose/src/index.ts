import { PrismaClient } from '@prisma/client';
import express from 'express'
const app = express();
const client= new PrismaClient();
app.get("/" , async (req , res)=>{
    const result = await client.user.findMany();
    res.status(200).json({
        message:"Get Endpoint",
        result
    })
});

app.post("/" , async (req , res)=>{
    await client.user.create({
        data: {
            username:Math.random.toString(),
            password:Math.random.toString()
        }
    })
    res.status(201).json({
        message:"Post Endpoint"
    })
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})