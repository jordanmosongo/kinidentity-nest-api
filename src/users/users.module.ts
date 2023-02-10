/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
/* import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { Family } from 'src/family/entities/family.entity';
import { FamilyService } from 'src/family/services/family.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Family]),  
  ],
  controllers: [UsersController],
  providers: [UsersService, FamilyService],
})
export class UsersModule {}
