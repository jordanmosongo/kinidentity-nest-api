import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommuneService } from 'src/commune/services/commune.service';
import { Repository } from 'typeorm';
import { CreateQuarterDto } from '../dto/create-quarter.dto';
import { UpdateQuarterDto } from '../dto/update-quarter.dto';
import { Quarter } from '../entities/quarter.entity';

@Injectable()
export class QuarterService {
  constructor(
    @InjectRepository(Quarter)
    private readonly quarterRepository: Repository<Quarter>,
    private communeService: CommuneService,
  ) {}
  async create(createQuarterDto: CreateQuarterDto): Promise<Quarter> {
    const commune = await this.communeService.findOne(
      createQuarterDto.communeId,
    );
    delete createQuarterDto.communeId;
    const newQuarter = this.quarterRepository.create({
      ...createQuarterDto,
      commune,
    });
    return this.quarterRepository.save(newQuarter);
  }

  findAll(): Promise<Quarter[]> {
    return this.quarterRepository.find();
  }

  findOne(id: number): Promise<Quarter> {
    return this.quarterRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateQuarterDto: UpdateQuarterDto,
  ): Promise<unknown> {
    const commune = await this.communeService.findOne(
      updateQuarterDto.communeId,
    );
    delete updateQuarterDto.communeId;
    return this.quarterRepository.update(id, { ...updateQuarterDto, commune });
  }
}
