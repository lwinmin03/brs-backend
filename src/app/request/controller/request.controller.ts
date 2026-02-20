import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { RequestDto } from "../dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestService } from "../service/request.service";
import { AtGuard } from "src/app/auth/guard/at.guard";
import { getAllBudgetDto } from "../dto/response/budget.response";


@Controller('/request')
export class RequestController {


    constructor(
        private budService:RequestService
    ){}



 @Post()
 @UseGuards(AtGuard)
 async requestBudget(@Body() Req:RequestDto ){

await this.budService.create(Req)



 }  
 
 

 @Get()
 @UseGuards(AtGuard)
 async getAllBudget():Promise<getAllBudgetDto[]>{
 return   await this.budService.findAll()

 }


}