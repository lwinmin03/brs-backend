import { Body, Controller, Post } from "@nestjs/common";
import { RequestDto } from "../dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestService } from "../service/request.service";

@Controller('request')
export class RequestController {


    constructor(
        private budService:RequestService
    ){}



 @Post()  
 async requestBudget(@Body() Req:RequestDto ){

await this.budService.create(Req)



 }   


}