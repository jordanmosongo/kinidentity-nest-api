/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/users/CreateUser.dto';
import { LoginUserDto } from 'src/dtos/users/LoginUserDto';
import { UpdateUserDto } from 'src/dtos/users/UpdateUserDto';
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
  async getUserById(@Param('id') id: number) {
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
      const createdUser = await this.usersService.createUser(createUserDto);
      console.log('createdUser', createdUser)
      return createdUser
    } catch (error) {
      console.log(error)
      return new HttpException("Something went bad !", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.usersService.signIn(loginUserDto)
      return token;
    } catch (error) {
      return new HttpException("Something went bad !", HttpStatus .INTERNAL_SERVER_ERROR)
    }
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
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
  async deleteUser(@Param('id') id: number) {
    try {
      const deleteResult = await this.usersService.deleteUser(id);
      return deleteResult
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
