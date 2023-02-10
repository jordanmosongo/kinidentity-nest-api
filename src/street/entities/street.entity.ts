import { Quarter } from 'src/quarter/entities/quarter.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'streets' })
export class Street {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Quarter, (quarter) => quarter.streets)
  quarter: Quarter;
}
