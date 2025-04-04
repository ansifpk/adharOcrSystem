import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
   if(err instanceof CustomError){
    return res.status(err.status).send({errors:err.serializeErrors()});
   }
   res.status(400).send({errors:"somthing wrongg...."});
   
}