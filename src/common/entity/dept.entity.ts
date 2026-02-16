import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApprovalPolicy } from './approval-policies/approcal-policies.entity';


@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // One Department can have many Approval Policies
  @OneToMany(() => ApprovalPolicy, (policy) => policy.department)
  approvalPolicies: ApprovalPolicy[];
}