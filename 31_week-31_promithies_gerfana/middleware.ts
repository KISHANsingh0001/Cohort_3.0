import type { NextFunction,Request,Response } from "express";

export function middleware(req:Request , res:Response , next:NextFunction){
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Time it took is ${endTime - startTime} ms for Method ${req.method} for Route ${req.route.path}`);

}