import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictService } from 'src/district/services/district.service';
import { Repository } from 'typeorm';
import { CreateCommuneDto } from '../dto/create-commune.dto';
import { Commune } from '../entities/commune.entity';

@Injectable()
export class CommuneService {
  constructor(
    @InjectRepository(Commune)
    private readonly communeRepository: Repository<Commune>,
    private readonly districtService: DistrictService,
  ) {}
  async create(createCommuneDto: CreateCommuneDto): Promise<Commune | boolean> {
    try {
      const district = await this.districtService.findOne(
        createCommuneDto.districtId,
      );
      if (!district) return false;

      delete createCommuneDto.districtId;
      const commune = this.communeRepository.create({
        ...createCommuneDto,
        district,
      });

      return this.communeRepository.save(commune);
    } catch (error) {
      return false;
    }
  }

  findAll(): Promise<Commune[]> {
    return this.communeRepository.find();
  }

  findOne(id: number): Promise<Commune> {
    return this.communeRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
