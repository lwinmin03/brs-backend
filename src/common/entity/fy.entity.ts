import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Capex } from './capex/capex.entity';

@Entity('fiscal_years')
export class FiscalYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'e.g. FY2025' })
  name: string;


  @OneToMany(() => Capex, (capex) => capex.fiscalYear)
capexList: Capex[];

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;
}