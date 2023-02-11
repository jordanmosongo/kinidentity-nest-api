import { IsNumber, IsString } from 'class-validator';

export class CreateParcelDto {
  @IsString()
  _number: string;

  @IsNumber()
  streetId: number;
}
