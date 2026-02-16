import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Capex } from './capex/capex.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ 
    unique: true, 
    comment: 'Internal Project Code e.g. PRJ-2024-001' 
  })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;


  @OneToOne(() => Capex, (capex) => capex.project)
capex: Capex;
}