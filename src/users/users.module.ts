/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { Family } from 'src/family/entities/family.entity';
import { FamilyService } from 'src/family/services/family.service';
import { Parcel } from 'src/parcel/entities/parcel.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Family, Parcel]),  
  ],
  controllers: [UsersController],
  providers: [UsersService, FamilyService],
})
export class UsersModule {}
