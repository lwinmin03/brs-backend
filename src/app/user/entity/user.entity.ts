import { Exclude } from 'class-transformer';
import { role } from 'src/common/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {

@PrimaryGeneratedColumn({})
id:number

@Column({nullable:false})
mail:string

@Column({nullable:true})
@Exclude()
password:string


@Column({default:"local"})
provider:string

@Column({default:'Requester'})
role:role



@Column()
rtHash:string


@Column()
createdAt:Date


@Column()
updatedAt:Date

}