import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/request/user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const exist = await this.userRepository.findOne({
      where: { mail: user.email },
    });

    if (exist) throw new ConflictException('Mail Already Exist');

    const hashPwd = await argon2.hash(user.password, { type: argon2.argon2id });

    const newUser = this.userRepository.create({
      mail: user.email,
      password: hashPwd,
      role: user.role,
    });

    return this.userRepository.save(newUser);
  }


  async saveOauthUser(user:any):Promise<any> {


       const newUser = this.userRepository.create({
      mail: user.mail,
      provider:"Microsoft"
      
    });

    return this.userRepository.save(newUser)

  }

  async fineOne(mail: string): Promise<any> {
    return await this.userRepository.findOne({ where: { mail: mail } });
  }


  async CheckUser(mail:string):Promise<any>{

const user=await this.userRepository.findOne({where:{mail:mail}})


if(user) {
    return user
} else {
    return null
}


  }




  async findAll():Promise<any>{
    return await this.userRepository.find()
  }


}
