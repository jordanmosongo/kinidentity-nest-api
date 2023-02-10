import { IsNumber, IsString } from 'class-validator';

export class CreateCommuneDto {
  @IsString()
  name: string;

  @IsNumber()
  districtId: number;
}
