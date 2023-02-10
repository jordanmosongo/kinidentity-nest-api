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
import { Family } from './family/entities/family.entity';
import { DistrictModule } from './district/district.module';
import { District } from './district/entities/district.entity';
import { CommuneModule } from './commune/commune.module';
import { Commune } from './commune/entities/commune.entity';
import { QuarterModule } from './quarter/quarter.module';
import { Quarter } from './quarter/entities/quarter.entity';
import { StreetModule } from './street/street.module';
import { Street } from './street/entities/street.entity';

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
      entities: [User, Role, Family, District, Commune, Quarter, Street],
      synchronize: true,
    }),    
    IndividModule,
    UsersModule,
    AuthModule,
    FamilyModule,
    DistrictModule,
    CommuneModule,
    QuarterModule,
    StreetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
