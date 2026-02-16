import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fiscal_years')
export class FiscalYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'e.g. FY2025' })
  name: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;
}