import { PartialType } from '@nestjs/mapped-types';
import { CreateStreetDto } from './create-street.dto';

export class UpdateStreetDto extends PartialType(CreateStreetDto) {
  name?: string;
  quarterId?: number;
}
