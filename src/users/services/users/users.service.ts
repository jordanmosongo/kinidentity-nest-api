/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
/* import { JwtService } from '@nestjs/jwt/dist'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UserType } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { SignInType } from 'src/types/signin-type';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    /* private jwtService: JwtService */   
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

      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;

      const newUser = this.userRepository.create({...userData, role});
      return this.userRepository.save(newUser)
    } catch (error) {
      console.log(error);
    } 
  }

  async signIn(credentials: SignInType): Promise<string | boolean> {

    try {
      const user = await this.userRepository.findOne({
        where: {
          username: credentials.username
        },
        relations: {
          role: true
        }
      })
      if(!user) {
        return false;
      }
      const hasMatched = await bcrypt.compare(credentials.password, user.password);
      
      if(!hasMatched) {
        return false
      }
      console.log("before sign");
      
      /* const token  = this.jwtService.sign(user, {
        secret: 'ThisIsAVeryLongJwtSecretKeyForAuthentification',
        expiresIn: '1d'
      })
      console.log("token =>", token);
      
      return token    */
    
    } catch (error) {
      return error
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
