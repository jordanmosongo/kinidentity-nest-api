/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
/* import { JwtService } from '@nestjs/jwt/dist'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UserType } from 'src/types/user.type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { FamilyService } from 'src/family/services/family.service';
import { Family } from 'src/family/entities/family.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private familyService: FamilyService  
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
 
  async createUser(userData: UserType): Promise<User | boolean> {
    try {
      const role = await this.findRoleById(userData.roleId)
      const family = await this.familyService.findOne(userData.familyId, false) as Family;

      if (!family) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;

      const newUser = this.userRepository.create({...userData, role, family});
      return this.userRepository.save(newUser)
    } catch (error) {
      console.log(error);
    } 
  }

  async updateUser(id: number, userData: UserType): Promise<User> { 
    try {
    const dataToUpdate = {
      ...userData, 
      role: await this.findRoleById(userData.roleId),
      family: await this.familyService.findOne(userData.familyId, false) as Family,
    }

    delete dataToUpdate.roleId;
    delete dataToUpdate.familyId;
    
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
