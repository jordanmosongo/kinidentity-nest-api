/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUserDto';
import { UsersService } from 'src/users/services/users/users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    try {
      const users = await this.usersService.fetchUsers();
      return users;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findUserById(id);
      if(!user) {
        return new HttpException('No user found', HttpStatus.NOT_FOUND)
      }
      return user
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      if(!updatedUser) {
        return new HttpException('No user found to update !', HttpStatus.NOT_FOUND)
      }
      return updatedUser;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
