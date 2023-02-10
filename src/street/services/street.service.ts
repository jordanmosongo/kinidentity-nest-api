import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuarterService } from 'src/quarter/services/quarter.service';
import { Repository } from 'typeorm';
import { CreateStreetDto } from '../dto/create-street.dto';
import { UpdateStreetDto } from '../dto/update-street.dto';
import { Street } from '../entities/street.entity';

@Injectable()
export class StreetService {
  constructor(
    @InjectRepository(Street)
    private readonly streetRepository: Repository<Street>,
    private quarterService: QuarterService,
  ) {}
  async create(createStreetDto: CreateStreetDto): Promise<Street> {
    const quarter = await this.quarterService.findOne(
      createStreetDto.quarterId,
    );
    delete createStreetDto.quarterId;
    const newStreet = this.streetRepository.create({
      ...createStreetDto,
      quarter,
    });
    return this.streetRepository.save(newStreet);
  }

  findAll(): Promise<Street[]> {
    return this.streetRepository.find();
  }

  findOne(id: number): Promise<Street> {
    return this.streetRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateStreetDto: UpdateStreetDto): Promise<unknown> {
    const quarter = await this.quarterService.findOne(
      updateStreetDto.quarterId,
    );
    delete updateStreetDto.quarterId;
    return this.streetRepository.update(id, { ...updateStreetDto, quarter });
  }
}
