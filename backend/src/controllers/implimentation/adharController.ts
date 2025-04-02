import { Request, Response, NextFunction } from "express";
import { IAdharControllerInterface } from "../interfaces/interface";
import { inject, injectable } from "tsyringe";
import { IAdharServiceInterface } from "../../services/interfaces/IAdharServiceInterface";


@injectable()
export class AdharController implements IAdharControllerInterface{
    constructor(
        @inject("AdharService") private adharService:IAdharServiceInterface,
    ){}
    async processAdharCard(req: Request, res: Response, next: NextFunction): Promise<void > {
       try {
        const data = await  this.adharService.processAdharCard(req,res,next);
        if(data){
            res.send({success:true,data:{
                ...data.front,
                ...data.back
              }}) 
        }
        
      } catch (error) {
        console.error(error)
        next(error)
       }
    }
    
    
}