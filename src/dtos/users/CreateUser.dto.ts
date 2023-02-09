/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  gender: string;

  @IsNumber()
  roleId: number;

  @IsString()
  username: string;

  @IsString()
  password: string;
}