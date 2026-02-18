// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthGuard implements CanActivate{
//     canActivate(context: ExecutionContext): Promise<boolean> {
//         const req=context.switchToHttp().getRequest();



//         const token=req?.cookies['access_token'];

//         if(!token){
//             throw new UnauthorizedException('Token is missing')
//         }



//         try {
// const payload=await jw


//         }catch{}
        
//     }
// }