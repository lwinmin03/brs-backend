import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([User])
    ],
    exports:[UserService],
    providers:[UserService],
    controllers:[UserController],
    
})
export class UserModule {



    
}
