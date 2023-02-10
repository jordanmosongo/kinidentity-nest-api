import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FamilyService } from '../services/family.service';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';

@Controller('families')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  async create(@Body() createFamilyDto: CreateFamilyDto) {
    try {
      const createdFamily = await this.familyService.create(createFamilyDto);
      return createdFamily;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const families = await this.familyService.findAll();
      return families;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const family = await this.familyService.findOne(id);
      if (typeof family === 'boolean') {
        return new HttpException('No family found !', HttpStatus.NOT_FOUND);
      }
      return family;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFamilyDto: UpdateFamilyDto,
  ) {
    try {
      const family = await this.familyService.update(id, updateFamilyDto);

      if (typeof family === 'boolean') {
        return new HttpException(
          'No family found to update',
          HttpStatus.BAD_REQUEST,
        );
      }
      return family;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.familyService.remove(id);
      return result;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
