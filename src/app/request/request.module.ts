import { Module } from '@nestjs/common';
import { RequestController } from './controller/request.controller';
import { RequestService } from './service/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entity/request.entity';

@Module({
imports: [
   
    TypeOrmModule.forFeature([Request]) 
  ],

exports:[RequestService],
    providers:[RequestService],
    controllers:[RequestController],

})
export class RequestModule {




}
