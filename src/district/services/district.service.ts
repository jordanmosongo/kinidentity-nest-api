import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from '../dto/create-district.dto';
import { District } from '../entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
  ) {}
  create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const newDistrict = this.districtRepository.create(createDistrictDto);
    return this.districtRepository.save(newDistrict);
  }

  findAll(): Promise<District[]> {
    return this.districtRepository.find();
  }

  findOne(id: number): Promise<District> {
    return this.districtRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
