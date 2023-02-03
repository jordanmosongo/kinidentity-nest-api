/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 50})
  name: string;

  @Column({length: 50})
  lastname: string;

  @Column({length: 50})
  firstname: string;

  @Column({length: 10})
  gender: string

}
