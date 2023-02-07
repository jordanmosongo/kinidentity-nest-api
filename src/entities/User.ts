/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 50})
  name: string;

  @Column({length: 50})
  lastname: string;

  @Column({length: 50})
  firstname: string;

  @Column({length: 10})
  gender: string

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

}
