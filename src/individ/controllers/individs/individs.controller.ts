/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateIndividDto } from 'src/individ/dtos/CreateIndivid.dto';
import { IndividsService } from 'src/individ/services/individs/individs.service';
import { IndividType } from 'src/utils/types/individ-type';

@Controller('individs')
export class IndividsController {
  constructor(private individsService: IndividsService) {}
  @Get()
  getIndivids(): IndividType[] {
    return this.individsService.fetchIndivids();
  }

  @Get(':id')
  getIndivid(@Param('id', ParseIntPipe) id: number) {
    const individ = this.individsService.findIndividById(id);
    if (!individ) {
      throw new HttpException('No individ found !', HttpStatus.NOT_FOUND);
    }
    return individ;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIndivid(@Body() individData: CreateIndividDto) {
    console.log(individData);
  }
}
