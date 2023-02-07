/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
