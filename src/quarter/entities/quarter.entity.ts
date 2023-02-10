import { Commune } from 'src/commune/entities/commune.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'quarters' })
export class Quarter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Commune, (commune) => commune.quarters)
  commune: Commune;
}
