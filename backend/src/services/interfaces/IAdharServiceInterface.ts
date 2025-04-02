import { NextFunction, Request, Response } from "express";

export interface IAdharServiceInterface{
    processAdharCard(req:Request,res:Response,next:NextFunction):Promise<void|{front:object,back:object}>
    parseAadhaarDetails(text:string,next: NextFunction):Promise<object|void>
    parseAadhaarBackDetails(text:string,next: NextFunction):Promise<object|void>
} 