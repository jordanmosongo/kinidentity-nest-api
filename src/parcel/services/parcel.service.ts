import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StreetService } from 'src/street/services/street.service';
import { Repository } from 'typeorm';
import { CreateParcelDto } from '../dto/create-parcel.dto';
import { UpdateParcelDto } from '../dto/update-parcel.dto';
import { Parcel } from '../entities/parcel.entity';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    private streetService: StreetService,
  ) {}
  async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    const street = await this.streetService.findOne(createParcelDto.streetId);
    delete createParcelDto.streetId;

    const parcel = this.parcelRepository.create({ ...createParcelDto, street });
    return this.parcelRepository.save(parcel);
  }

  findAll(): Promise<Parcel[]> {
    return this.parcelRepository.find();
  }

  findOne(id: number): Promise<Parcel> {
    return this.parcelRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateParcelDto: UpdateParcelDto): Promise<unknown> {
    const street = await this.streetService.findOne(updateParcelDto.streetId);
    delete updateParcelDto.streetId;

    return this.parcelRepository.update(id, { ...updateParcelDto, street });
  }
}
