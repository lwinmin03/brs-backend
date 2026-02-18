import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { type CreateUserDto } from "../dto/request/user.dto";
import { AtGuard} from "src/app/auth/guard/at.guard";
import { RoleGuard } from "src/app/auth/guard/role.guard";
import { Role } from "src/common/decorator/role.decorator";
import { role } from "src/common/enum/role.enum";

@Controller('/user')
export class UserController {
    constructor (
        private userService:UserService
    ){}




@Post()
// @UseGuards(AtGurard,RoleGuard)
// @Role(role.ADMIN)
async create(@Body() user:CreateUserDto):Promise <any>{
    return this.userService.create(user)
}




@Get()
@UseGuards(AtGuard)
@Role(role.ADMIN)
async findAll():Promise <any> {
    return await this.userService.findAll()
}







}