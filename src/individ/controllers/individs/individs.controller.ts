import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateIndividDto } from 'src/individ/dtos/CreateIndivid.dto';
import { IndividsService } from 'src/individ/services/individs/individs.service';

@Controller('individs')
export class IndividsController {
  constructor(private individsService: IndividsService) {}
  @Get()
  getIndivids() {
    return this.individsService.fetchIndivids();
  }

  @Get(':id')
  getIndivid(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIndivid(@Body() individData: CreateIndividDto) {
    console.log(individData);
  }
}
