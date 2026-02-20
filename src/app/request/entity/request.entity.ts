import { Capex } from "src/common/entity/capex/capex.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('request')
export class BudRequest {

  @PrimaryGeneratedColumn('identity')    
  id: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  amount: string;

 
  @Column({ name: 'description', length: 120 }) 
  desc: string; 


  @ManyToOne('User')
  @JoinColumn({name:"userId"}) 
  user: any; 

// Add this relation!
  @ManyToOne(() => Capex)
  @JoinColumn({ name: 'capexId' })
  capex: Capex;

  @Column()
  req_date: Date;
}