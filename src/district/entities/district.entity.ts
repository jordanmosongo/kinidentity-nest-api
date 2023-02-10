import { Commune } from 'src/commune/entities/commune.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25, unique: true })
  name: string;

  @OneToMany(() => Commune, (commune) => commune.district, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  communes: Commune[];
}
