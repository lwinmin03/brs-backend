import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AtGurard extends AuthGuard('jwt') {
    constructor(){
        super()
    }
    
}