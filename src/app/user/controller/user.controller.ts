import { Body, Controller, Get, Post } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { type CreateUserDto } from "../dto/request/user.dto";

@Controller('/user')
export class UserController {
    constructor (
        private userService:UserService
    ){}




@Post()
async create(@Body() user:CreateUserDto):Promise <any>{
    return this.userService.create(user)
}












}