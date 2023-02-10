import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25, unique: true })
  name: string;
}
