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

  async findOne(id: number, withUsers: boolean): Promise<Family | boolean> {
    const family = await this.familyRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });
    if (!family) {
      return false;
    }
    if (!withUsers) {
      delete family.users;
    }
    return family;
  }

  async update(
    id: number,
    updateFamilyDto: UpdateFamilyDto,
  ): Promise<Family | boolean> {
    const family = await this.findOne(id, false);
    if (!family) {
      return false;
    }
    this.familyRepository.update(id, updateFamilyDto);
    return this.findOne(id, false);
  }

  remove(id: number): Promise<unknown> {
    return this.familyRepository.delete(id);
  }
}
