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
  fetchUsers(): UserType[] {
    return [];
  }
  findUserById(id: string) {
    return id;
  }
  createUser(userData: UserType) {
    return userData;
  }
  updateUser(id: string) {
    return 'User updated !' + id;
  }
  deleteUser(id: string) {
    return id;
  }
}
