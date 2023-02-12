/* eslint-disable prettier/prettier */
import { Family } from 'src/family/entities/family.entity';
import { Parcel } from 'src/parcel/entities/parcel.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
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
  gender: string;

  @Column({length:25, unique: true})
  username: string;
  
  @Column()
  password: string;  

  @ManyToOne(() => Role, (role) => role.users, {onUpdate: 'CASCADE'})
  role: Role;

  @ManyToOne(() => Family, (family) => family.users)
  family: Family;

  @ManyToMany(() => Parcel)
  @JoinTable()
  parcels: Parcel[];
}
