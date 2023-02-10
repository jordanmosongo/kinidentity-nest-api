import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StreetService } from '../services/street.service';
import { CreateStreetDto } from '../dto/create-street.dto';
import { UpdateStreetDto } from '../dto/update-street.dto';

@Controller('streets')
export class StreetController {
  constructor(private readonly streetService: StreetService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createStreetDto: CreateStreetDto) {
    try {
      const createdStreet = await this.streetService.create(createStreetDto);
      return createdStreet;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const streets = await this.streetService.findAll();
      return streets;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const street = await this.streetService.findOne(id);
      if (!street) {
        return new HttpException('No street found !', HttpStatus.NOT_FOUND);
      }
      return street;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStreetDto: UpdateStreetDto,
  ) {
    try {
      const result = await this.streetService.update(id, updateStreetDto);
      return result;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
