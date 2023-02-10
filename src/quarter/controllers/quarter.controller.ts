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
import { QuarterService } from '../services/quarter.service';
import { CreateQuarterDto } from '../dto/create-quarter.dto';
import { UpdateQuarterDto } from '../dto/update-quarter.dto';

@Controller('quarters')
export class QuarterController {
  constructor(private readonly quarterService: QuarterService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createQuarterDto: CreateQuarterDto) {
    try {
      const createdQuarter = await this.quarterService.create(createQuarterDto);
      return createdQuarter;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const quarters = await this.quarterService.findAll();
      return quarters;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const quarter = await this.quarterService.findOne(id);
      if (!quarter) {
        return new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      return quarter;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuarterDto: UpdateQuarterDto,
  ) {
    try {
      return await this.quarterService.update(id, updateQuarterDto);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
