import { IsNumber, IsString } from 'class-validator';

export class CreateQuarterDto {
  @IsString()
  name: string;

  @IsNumber()
  communeId: number;
}
