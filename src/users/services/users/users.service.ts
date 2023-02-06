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
  findUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId
      }
    });
  }
  createUser(userData: UserType): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser)
  }
  updateUser(id: string, userData: UserType): Promise<User> {    
    this.userRepository.update(id, userData)
    return this.userRepository.findOneBy({id})
  }
  deleteUser(id: string): Promise<unknown> {
    return this.userRepository.delete(id)
  }
}
