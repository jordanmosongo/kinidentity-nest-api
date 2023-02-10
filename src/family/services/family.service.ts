import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { Family } from '../entities/family.entity';
import { FamilyType } from '../types/family.type';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family) private familyRepository: Repository<Family>,
  ) {}
  create(familyData: FamilyType): Promise<Family> {
    const user = this.familyRepository.create(familyData);
    return this.familyRepository.save(user);
  }

  findAll(): Promise<Family[]> {
    return this.familyRepository.find();
  }

  async findOne(id: number): Promise<Family | boolean> {
    const family = await this.familyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!family) {
      return false;
    }
    return family;
  }

  async update(
    id: number,
    updateFamilyDto: UpdateFamilyDto,
  ): Promise<Family | boolean> {
    const family = await this.findOne(id);
    if (!family) {
      return false;
    }
    this.familyRepository.update(id, updateFamilyDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<unknown> {
    return this.familyRepository.delete(id);
  }
}
