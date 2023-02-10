import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommuneService } from '../services/commune.service';
import { CreateCommuneDto } from '../dto/create-commune.dto';

@Controller('communes')
export class CommuneController {
  constructor(private readonly communeService: CommuneService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCommuneDto: CreateCommuneDto) {
    try {
      const commune = await this.communeService.create(createCommuneDto);
      if (typeof commune === 'boolean') {
        return new HttpException(
          'Failed to save commune',
          HttpStatus.BAD_REQUEST,
        );
      }
      return commune;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.communeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communeService.findOne(+id);
  }
}
