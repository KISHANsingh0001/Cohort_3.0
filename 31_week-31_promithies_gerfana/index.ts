import express from "express";
import type { Request, Response, NextFunction } from "express";
import promClient from "prom-client"
import { activeRequestsGauge } from "./activeRequest";
import { requestCounter } from "./requestCounter";
import { middleware } from "./middleware";

const app = express();
app.use(middleware)

app.get("/cpu" , async (req:Request , res:Response)=>{
     await new Promise((resolve , reject)=>{
        setTimeout(() => {
           resolve;
        } , 10*1000);
     })
    // for(let i = 0 ; i<1000000000; i++){
    //     Math.random();
    // }
    res.json({
        msg:"cpu"
    });
    
   
});

app.get("/user" , (req , res)=>{
    res.json({
        msg:"users"
    })
});

app.get("/metrics" , async (req , res)=>{
    // register the metrics
   const metrics = await promClient.register.metrics();
   // set the content-type example json or html
   res.set(`Content-Type`, promClient.register.contentType);
   // send the metrics to the browser
   res.end(metrics);
});

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
});
