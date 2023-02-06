/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserType } from 'src/utils/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  fetchUsers(): Promise<User[]> {
    return this.userRepository.find()
  }
  findUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        role: true
      }            
    });
  }
  createUser(userData: UserType): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser)
  }
  updateUser(id: number, userData: UserType): Promise<User> {    
    this.userRepository.update(id, userData)
    return this.userRepository.findOneBy({id})
  }
  deleteUser(id: number): Promise<unknown> {
    return this.userRepository.delete(id)
  }
}
