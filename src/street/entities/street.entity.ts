import { Parcel } from 'src/parcel/entities/parcel.entity';
import { Quarter } from 'src/quarter/entities/quarter.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'streets' })
export class Street {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Quarter, (quarter) => quarter.streets)
  quarter: Quarter;

  @OneToMany(() => Parcel, (parcel) => parcel.street)
  parcels: Parcel[];
}
