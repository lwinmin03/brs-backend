import { User } from "src/app/user/entity/user.entity";
import { Capex } from "src/common/entity/capex/capex.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {

  @PrimaryGeneratedColumn('identity')    
  id: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  amount: string;

  @Column({ length: 120 })
  desc: string;

  // 👇 Changed from @OneToOne to @ManyToOne
  @ManyToOne(() => User)
  @JoinColumn() 
  user: User;

  // 👇 Changed from @OneToOne to @ManyToOne
  @ManyToOne(() => Capex)
  @JoinColumn()
  capex: Capex;

  @Column()
  req_date: Date;

}