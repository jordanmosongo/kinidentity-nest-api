import { District } from 'src/district/entities/district.entity';
import { Quarter } from 'src/quarter/entities/quarter.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'communes' })
export class Commune {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25, unique: true })
  name: string;

  @ManyToOne(() => District, (district) => district.communes)
  district: District;

  @OneToMany(() => Quarter, (quarter) => quarter.commune)
  quarters: Quarter[];
}
