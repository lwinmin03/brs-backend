import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApprovalPolicy } from './approval-policies/approcal-policies.entity';
import { Capex } from './capex/capex.entity';


@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @OneToMany(() => Capex, (capex) => capex.department)
capexList: Capex

  // One Department can have many Approval Policies
  @OneToMany(() => ApprovalPolicy, (policy) => policy.department)
  approvalPolicies: ApprovalPolicy[];
}