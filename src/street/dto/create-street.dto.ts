import { IsNumber, IsString } from 'class-validator';

export class CreateStreetDto {
  @IsString()
  name: string;

  @IsNumber()
  quarterId: number;
}
