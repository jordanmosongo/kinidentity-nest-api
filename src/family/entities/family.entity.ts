/* eslint-disable prettier/prettier */
import { User } from 'src/entities/User';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'families' })
export class Family {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({default: 'none'})
  icon: string;

  @OneToMany(() => User, (user) => user.family, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  users: User[];
}

