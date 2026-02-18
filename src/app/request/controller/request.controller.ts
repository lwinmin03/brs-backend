import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { RequestDto } from "../dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestService } from "../service/request.service";
import { AtGuard } from "src/app/auth/guard/at.guard";
import { RoleGuard } from "src/app/auth/guard/role.guard";
import { Role } from "src/common/decorator/role.decorator";
import { role } from "src/common/enum/role.enum";

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


}