import { District } from 'src/district/entities/district.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'communes' })
export class Commune {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25, unique: true })
  name: string;

  @ManyToOne(() => District, (district) => district.communes)
  district: District;
}
