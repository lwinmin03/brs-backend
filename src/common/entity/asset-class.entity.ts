import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AssetClass {


  @PrimaryGeneratedColumn()
  id:number

  
  name:string


  @Column({unique:true})
  code:string
}