import { JwtService } from "@nestjs/jwt";
import { MicrosoftService } from "./microsoft.service";

export class AuthService{

constructor (
    private jwtService:JwtService,
    private microsoftServcie:MicrosoftService
){}



async SignInWithMicroSoft(code:string){
    const microsoftUser=this.microsoftServcie.validateCode(code);

    //validate user (new user - > store in db ,if not new user - > next)

    
}





}