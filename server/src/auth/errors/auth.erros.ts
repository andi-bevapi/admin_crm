import { HttpException } from "@nestjs/common";

export class AuthErrors extends HttpException{
    constructor(message,httpStatus){
        super(message, httpStatus);
    }
}