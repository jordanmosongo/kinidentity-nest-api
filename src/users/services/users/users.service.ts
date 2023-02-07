/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UserType } from 'src/utils/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
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
        role: true,
      }            
    });
  }

  findRoleById(roleId: number): Promise<Role> {
    return this.roleRepository.findOneBy({id: roleId})
  }
 
  async createUser(userData: UserType): Promise<User> {
    try {
      const role = await this.findRoleById(userData.roleId)
      const newUser = this.userRepository.create({...userData, role});
      return this.userRepository.save(newUser)
    } catch (error) {
      console.log(error);
    } 
  }
  async updateUser(id: number, userData: UserType): Promise<User> { 
    try {
    const dataToUpdate = {
      ...userData, 
      role: await this.findRoleById(userData.roleId)
    }

    delete dataToUpdate.roleId;
    this.userRepository.update(id, dataToUpdate)

    return this.userRepository.findOneBy({id})
    } catch (error) {
      console.log(error)
    }
  }
  deleteUser(id: number): Promise<unknown> {
    return this.userRepository.delete(id)
  }
}
