import { NextFunction, Request, Response } from "express";

export interface IAdharRepositoryInterface{
    processAdharCard(req:Request,res:Response,next:NextFunction):Promise<void>
} 