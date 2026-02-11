import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MicrosoftService } from '../services/microsoft.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    
  ) {}



  
  @Post('/login')
  @ApiOperation({summary:"Sign Up with Microsoft"})
  @ApiResponse({status:201,description:"User successfully created"})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async OauthMicrosoft(@Body('code') code:string): Promise<any> {
    return await this.authService.SignInWithMicroSoft(code);
  }
}
