import { Router } from "express";
import { IAdharRouter } from "../intrfaces/IAdharRouter";
import { inject, injectable } from "tsyringe";
import { IAdharControllerInterface } from "../../controllers/interfaces/interface";
import upload from '../../middlewares/multer';
import "reflect-metadata";

@injectable()
export class AdharRouter implements IAdharRouter{
    public router = Router();
    constructor(
        @inject('AdharController') private adharController:IAdharControllerInterface,
    ){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(
            "/detailes",
            upload,
            this.adharController.processAdharCard.bind(this.adharController)
        )
    }
    
}