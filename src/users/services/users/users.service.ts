/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UserType } from 'src/types/user.type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { FamilyService } from 'src/family/services/family.service';
import { Family } from 'src/family/entities/family.entity';
import { Parcel } from 'src/parcel/entities/parcel.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Parcel) private parcelRepository: Repository<Parcel>,
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
        parcels: true
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
      const parcel = await this.parcelRepository.findOne({
        where: {
          id: userData.parcelId
        }
      })

      if (!parcel || !family) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;

      const newUser = this.userRepository.create({...userData, role, family});
      newUser.parcels = [parcel];

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
