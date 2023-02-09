/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividModule } from './individ/individ.module';
import { Role } from './entities/Role';
import { User } from './entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FamilyModule } from './family/family.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: 'root',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Role],
      synchronize: true,
    }),    
    IndividModule,
    UsersModule,
    AuthModule,
    FamilyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
