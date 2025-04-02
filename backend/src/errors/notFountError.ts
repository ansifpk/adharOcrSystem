import { CustomError } from "./customError";

export class NotFoundError extends CustomError{
   
    status=404
    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,NotFoundError.prototype)
    }
    serializeErrors(){
       return [{message:this.message}]
    }
}