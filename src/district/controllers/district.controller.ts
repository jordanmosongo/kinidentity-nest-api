import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DistrictService } from '../services/district.service';
import { CreateDistrictDto } from '../dto/create-district.dto';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    try {
      const district = await this.districtService.create(createDistrictDto);
      return district;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const districts = await this.districtService.findAll();
      return districts;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const district = await this.districtService.findOne(id);
      if (!district) {
        return new HttpException('No district found !', HttpStatus.NOT_FOUND);
      }
      return district;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
