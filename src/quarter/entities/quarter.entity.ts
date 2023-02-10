import { Commune } from 'src/commune/entities/commune.entity';
import { Street } from 'src/street/entities/street.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'quarters' })
export class Quarter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Commune, (commune) => commune.quarters)
  commune: Commune;

  @OneToMany(() => Street, (street) => street.quarter)
  streets: Street[];
}
