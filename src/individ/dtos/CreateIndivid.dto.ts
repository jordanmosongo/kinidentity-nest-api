/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateIndividDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
}
