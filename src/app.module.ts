/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividModule } from './individ/individ.module';
import { Role } from './entities/Role';
import { User } from './entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'kinidentity',
      entities: [User, Role],
      synchronize: true,
    }),
    IndividModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
