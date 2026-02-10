import { Controller, Get } from "@nestjs/common";

@Controller('/user')
export class UserController {
    constructor (){}




@Get()
async findAll(){
    return "Hello"
}




}