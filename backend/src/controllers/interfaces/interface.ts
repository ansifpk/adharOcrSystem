import { NextFunction, Request, Response } from "express";

export interface IAdharControllerInterface{
    processAdharCard(req:Request,res:Response,next:NextFunction):Promise<void>  
}