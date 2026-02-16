import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../dept.entity';
import { FiscalYear } from '../fy.entity';
import { Project } from '../project.entity';


@Entity()
export class Capex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'Standard UNIQUE CODE', unique: true })
  code: string;

  @ManyToOne(() => Department, (dept) => dept.capexList) 
  @JoinColumn({ name: 'department_id' }) 
  department: Department;


  @ManyToOne(() => FiscalYear, (fy) => fy.capexList)
  @JoinColumn({ name: 'fiscal_year_id' })
  fiscalYear: FiscalYear;

 
  @OneToOne(() => Project, (prj) => prj.capex)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  totalAmount: string;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  availableAmount: string;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  usedAmount: string;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0 })
  reservedAmount: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}