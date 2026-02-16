import { JwtService } from '@nestjs/jwt';
import { MicrosoftService } from './microsoft.service';
import { UserService } from 'src/app/user/services/user.service';
import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private readonly microsoftServcie: MicrosoftService,
  ) {}

  async SignInWithMicroSoft(code: string) {
    //#1 validate code
    const microsoftUser: any = await this.microsoftServcie.validateCode(code);

    console.log('MU', microsoftUser);

    const user: any = await this.userService.CheckUser(microsoftUser?.mail);

    console.log('User', user);

    if (!user) {
      console.log('Here we go...');

      const saveUser = await this.userService.saveOauthUser(microsoftUser);
      console.log('Saved', saveUser);

      if (saveUser) {
        const { at, rt } = await this.generateToken(
          user?.id,
          user?.mail,
          user?.role,
        );

        return {
          access_token: at,
          refresh_token: rt,
          user: saveUser,
        };
      }
    } else {
      const { at, rt } = await this.generateToken(
        user?.id,
        user?.mail,
        user?.role,
      );

      return {
        access_token: at,
        refresh_token: rt,
        user: user,
      };
    }
  }

  async generateToken(id: number, email: string, role: string): Promise<any> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '10min',
        },
      ),
      this.jwtService.signAsync(
        { sub: id, email, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }

  async login(email: string, password: string): Promise<any> {
    const user: any = this.userService.CheckUser(email);

    if (!user) return { message: 'User does not exist in this system' };

    const isAuth = await argon.verify(user?.password, password);

    if (isAuth) {
      const { at, rt } = await this.generateToken(
        user?.id,
        user?.mail,
        user?.role,
      );

      return {
        access_token: at,
        refresh_token: rt,
      };
    } else {
      return { message: 'Invalid Credentials' };
    }
  }
}
