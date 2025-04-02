import { Request, Response, NextFunction } from "express";
import { IAdharServiceInterface } from "../interfaces/IAdharServiceInterface";
import  {  createWorker, PSM } from "tesseract.js";
import { BadRequestError } from "../../errors/BadRequestError";

export class AdharService implements IAdharServiceInterface{
    
   async processAdharCard(req: Request, res: Response, next: NextFunction): Promise<void|{front:object,back:object}> {
       try {
      
         const files = req.files as { [fieldname: string]: Express.Multer.File[] };
         const worker = await createWorker('eng');
         await worker.setParameters({
           "tessedit_pageseg_mode":PSM.AUTO_ONLY
         });
         const backetext = await worker.recognize(files.backImage[0].path);
         const  frontText = await worker.recognize(files.frontImage[0].path);
         worker.terminate();
         const front = await this.parseAadhaarDetails(frontText.data.text,next)
         const back = await this.parseAadhaarBackDetails(backetext.data.text,next);
         if(front&&back){
           return {front,back}
         }
       } catch (error) {
        console.error(error);
        next(error);
       }
    }

    async parseAadhaarDetails(text: string,next: NextFunction):Promise<object|void> {
     try {
       let nameRegex =/^(?!Issue\s+Date|Date\s+of\s+Birth|VID|Male|Female|\d)([A-Za-z\s]+)$/gm;
       let dobRegex = /DOB[:\s]+(\d{2}\/\d{2}\/\d{4})/;
       let genderRegex = /\b(Male|Female|M|F|पुरुष|महिला)\b/i;
       let uidRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
       if(!text.match(nameRegex)?.[0].trim()||!text.match(genderRegex)?.[1]||!text.match(uidRegex)?.[0]||!text.match(dobRegex)?.[1]){
         throw new BadRequestError("Please upload an adhar image...");
       }
       return {
         Name: text.match(nameRegex)?.[0].trim() || "Not Found",
         DOB: text.match(dobRegex)?.[1] || "Not Found",
         Gender: text.match(genderRegex)?.[1] || "Not Found",
         UID: text.match(uidRegex)?.[0] || "Not Found",
        };
     } catch (error) {
      console.error(error);
      next(error)
     }
    };
    async parseAadhaarBackDetails(text: string,next: NextFunction):Promise<object|void> {
      try {
        let addres = /S[:\s]+([A-Za-z\s,]+)/;
        let district = /Address[:\s]+([A-Za-z\s]+)/;
        let state = /([A-Za-z]+)\s*-\s*(\d{6})/;
        if( !text.match(addres)?.[1].replace(/\n+/g, " ").trim()||!text.match(district)?.[1]||!text.match(state)?.[1].trim()||!text.match(state)?.[2]){
          throw new BadRequestError("Please upload an adhar image...");
        }
        return {
          addres :  text.match(addres)?.[1].replace(/\n+/g, " ").trim() || "Not Found",
          district :  text.match(district)?.[1] || "Not Found",
          state :  text.match(state)?.[1].trim() || "Not Found",
          pincode :  text.match(state)?.[2] || "Not Found",
         };
      } catch (error) {
        next(error)
      }
    };
}