import { CustomError } from "./customError";

export class BadRequestError extends CustomError{
    status=404;
    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,BadRequestError.prototype)
    }
    serializeErrors(){
        return [{message:this.message}]
    }
    
}