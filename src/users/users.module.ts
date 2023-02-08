/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
/* import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
 
   /*  PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'ThisIsAVeryLongJwtSecretKeyForAuthentification!',
      signOptions: {
        expiresIn: '1d'
      }
    }) */
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
