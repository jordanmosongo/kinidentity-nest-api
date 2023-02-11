/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividModule } from './individ/individ.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FamilyModule } from './family/family.module';
import * as dotenv from 'dotenv';
import { DistrictModule } from './district/district.module';
import { CommuneModule } from './commune/commune.module';
import { QuarterModule } from './quarter/quarter.module';
import { StreetModule } from './street/street.module';

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
      autoLoadEntities: true,
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
