import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login.dto';

import {type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/oauth-login')
  @ApiOperation({ summary: 'Sign Up with Microsoft' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async OauthMicrosoft(@Body('code') code: string): Promise<any> {
    return await this.authService.SignInWithMicroSoft(code);
  }




@Post('/login')
@HttpCode(HttpStatus.OK)
async Login(@Body() dtoUser:LoginUserDto,
@Res({passthrough:true}) res:Response<any>
):Promise<any>{
const {user,access_token,refresh_token}= await this.authService.login(dtoUser.email,dtoUser.password);

console.log("AT",access_token);


console.log("USER",user);



res.cookie(
  'access_token',access_token,{
    httpOnly:true,
    secure:false,
    signed:true,
    sameSite:'lax',
    expires:new Date(Date.now() + 5*  60 * 1000),

  }
)



res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      signed:true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
    });



    return {
      data:{
        user,
        message:"Login Success"
      }
    }





}



}
