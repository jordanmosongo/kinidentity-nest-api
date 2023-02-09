/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AuthLoginDto } from 'src/dtos/auth/AuthLoginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      const token = await this.authService.login(authLoginDto);
      if (typeof token === 'boolean') {
        return new HttpException(
          'username or password is incorrect !',
          HttpStatus.BAD_REQUEST,
        );
      }
      return token;
    } catch (error) {
      console.log('error', error);
    }
  }
}
