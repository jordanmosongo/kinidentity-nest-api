import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post()
  createUser() {
    // return this.usersService.createUser();
  }

  @Put('/:id')
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
