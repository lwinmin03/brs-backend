import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MicrosoftService } from '../services/microsoft.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    
  ) {}

  @Post('/login')
  async OauthMicrosoft(@Body('code') code:string): Promise<any> {
    return await this.authService.SignInWithMicroSoft(code);
  }
}
