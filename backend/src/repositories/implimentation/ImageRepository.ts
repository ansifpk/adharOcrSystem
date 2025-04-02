import { Request, Response, NextFunction } from "express";
import { ImageRepositoryInterface } from "../interfaces/IAdharRepositoryInterface";

export class ImageRepository implements ImageRepositoryInterface{
   async processAdharCard(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
        
       } catch (error) {
        console.error(error);
        next(error);
       }
    }
}