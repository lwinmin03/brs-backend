import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AssetClass {


  @PrimaryGeneratedColumn()
  id:number

  @Column({nullable:true})
  name:string


  @Column({unique:true})
  code:string
}