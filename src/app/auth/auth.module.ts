import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MicrosoftService } from './services/microsoft.service';
import { AtStrategy } from './strategy/at.strategy';
import { UserModule } from '../user/user.module';
@Module({
    imports:[
        JwtModule.register(
            {
                secret:process.env.SECRET,
                signOptions:{
                    expiresIn:"1d"
                }
            }
        ),
        UserModule
    ]
    ,controllers:[AuthController],
    providers:[
        AuthService,MicrosoftService,AtStrategy
    ]
})
export class AuthModule {}
