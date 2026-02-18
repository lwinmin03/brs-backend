import { User } from "src/app/user/entity/user.entity";
import { Capex } from "src/common/entity/capex/capex.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {


@PrimaryGeneratedColumn('identity')    
id:number

@Column({type:'decimal',precision:4,scale:19,default:0})
amount:string


@Column({length:120})
desc:string


@OneToOne(()=>User)
@JoinColumn()
user:User



@OneToOne(()=>Capex,(capex)=>capex.id)
@JoinColumn({})
capex:Capex






@Column()
req_date:Date


}