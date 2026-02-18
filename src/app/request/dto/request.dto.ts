import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestDto{



@IsNumber()
req_amt:number


@IsString()
desc:string


@IsNotEmpty()
@IsNumber()    
capexId:number


@IsNumber()
userId:number



}