import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AmtRange {

    @PrimaryGeneratedColumn('identity')
    id:number


    @Column({nullable:false,type:'decimal',precision:19,scale:4,default:0})
    min:string


    
    @Column({nullable:false,type:'decimal',precision:19,scale:4,default:0})
    max:string


}