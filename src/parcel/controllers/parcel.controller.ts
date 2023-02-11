import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ParcelService } from '../services/parcel.service';
import { CreateParcelDto } from '../dto/create-parcel.dto';
import { UpdateParcelDto } from '../dto/update-parcel.dto';

@Controller('parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createParcelDto: CreateParcelDto) {
    try {
      const parcel = await this.parcelService.create(createParcelDto);
      return parcel;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const parcels = await this.parcelService.findAll();
      return parcels;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const parcel = await this.parcelService.findOne(id);
      if (!parcel) {
        return new HttpException('No parcel found !', HttpStatus.NOT_FOUND);
      }
      return parcel;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateParcelDto: UpdateParcelDto,
  ) {
    try {
      return await this.parcelService.update(id, updateParcelDto);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
