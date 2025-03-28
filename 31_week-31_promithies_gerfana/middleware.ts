import type { NextFunction , Request , Response } from "express";
import { activeRequestsGauge } from "./activeRequest";
import { requestCounter } from "./requestCounter";
import express from "express";

export function middleware(req:Request , res:Response , next:NextFunction){
    // if(req.path !== "/metrics"){
    //     activeRequestsGauge.inc();
    // }
    activeRequestsGauge.inc();
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
    //    if(req.path !== "/metrics"){
    //     activeRequestsGauge.dec();
    // }
    activeRequestsGauge.dec();
    });
  
    next();

    
}

