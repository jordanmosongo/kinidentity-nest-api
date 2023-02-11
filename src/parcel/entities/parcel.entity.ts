import { Street } from 'src/street/entities/street.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parcels' })
export class Parcel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  _number: string;

  @ManyToOne(() => Street, (street) => street.parcels)
  street: Street;
}
