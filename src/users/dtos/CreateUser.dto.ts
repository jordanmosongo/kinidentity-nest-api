/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  gender: string;

  @IsUUID()
  roleId: string;
}
