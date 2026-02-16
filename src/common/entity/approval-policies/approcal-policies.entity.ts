import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Department } from '../dept.entity';
import { ApprovalStep } from './approval-step.entity';


@Entity('approval_policies')
export class ApprovalPolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: "e.g. 'Standard CAPEX Workflow'" })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;


  @ManyToOne(() => Department, (department) => department.approvalPolicies, {
    nullable: true, 
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

 
  @Column({ name: 'department_id', nullable: true, readonly: true })
  departmentId: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;




@OneToMany(() => ApprovalStep, (step) => step.policy)
steps: ApprovalStep[];
}