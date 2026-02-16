import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn 
} from 'typeorm';
import { ApprovalPolicy } from './approcal-policies.entity';
 // Assumed path

@Entity('approval_steps')
export class ApprovalStep {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to the Policy
  @ManyToOne(() => ApprovalPolicy, (policy) => policy.steps, {
    onDelete: 'CASCADE' // Clean up steps if a policy is deleted
  })
  @JoinColumn({ name: 'policy_id' })
  policy: ApprovalPolicy;

  @Column({ name: 'step_order', comment: '1, 2, 3... The sequence' })
  stepOrder: number;

  @Column({ name: 'role_required', comment: "e.g. 'MANAGER', 'DIRECTOR', 'CFO'" })
  roleRequired: string;

  // Logic Gates
  @Column({ 
    name: 'min_amount', 
    type: 'decimal', 
    precision: 19, 
    scale: 4, 
    default: 0,
    comment: 'If request < this, skip this step' 
  })
  minAmount: number; // Note: TypeORM often returns decimals as strings in JS

  @Column({ 
    name: 'max_amount', 
    type: 'decimal', 
    precision: 19, 
    scale: 4, 
    nullable: true, 
    comment: 'If request > this, maybe skip? Usually null' 
  })
  maxAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}