/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInType } from 'src/types/signin-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(credentials: SignInType): Promise<string | boolean> {
    const user = await this.userRepository.findOne({
      where: {
        username: credentials.username,
      },
      relations: {
        role: true,
      },
    });
    if (!user) {
      return false;
    }
    const hasMatched = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!hasMatched) {
      return false;
    }
    const token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role.name,
      },
      {
        secret: 'ThisIsAVeryLongJwtSecretKeyForAuthentification',
        expiresIn: '1d',
      },
    );
    return token;
  }
}
