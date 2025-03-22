import express from "express";
import type { Request, Response, NextFunction } from "express";
import promClient from "prom-client"
// creating our first matrix which count the http request 
const requestCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'] // dimension only make sense if it has no of limited values otherwise it will create infinite rows
});
function middleware(req:Request , res:Response , next:NextFunction){
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });

    next();
    
}
const app = express();
app.use(middleware)
app.get("/cpu" , (req , res)=>{
    
    for(let i = 0 ; i<1000000000; i++){
        Math.random();
    }
    res.json({
        msg:"cpu"
    })
    
   
});

app.get("/users/:" , (req , res)=>{
    res.json({
        msg:"users"
    })
})
app.get("/metrics" , async (req , res)=>{
    // register the metrics
   const metrics = await promClient.register.metrics();
   // set the content-type example json or html
   res.set(`Content-Type`, promClient.register.contentType);
   // send the metrics to the browser
   res.end(metrics);
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})
