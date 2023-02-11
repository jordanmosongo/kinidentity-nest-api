import { Module } from '@nestjs/common';
import { ParcelService } from './services/parcel.service';
import { ParcelController } from './controllers/parcel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './entities/parcel.entity';
import { Street } from 'src/street/entities/street.entity';
import { StreetService } from 'src/street/services/street.service';
import { Quarter } from 'src/quarter/entities/quarter.entity';
import { Commune } from 'src/commune/entities/commune.entity';
import { District } from 'src/district/entities/district.entity';
import { QuarterService } from 'src/quarter/services/quarter.service';
import { CommuneService } from 'src/commune/services/commune.service';
import { DistrictService } from 'src/district/services/district.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parcel, Street, Quarter, Commune, District]),
  ],
  controllers: [ParcelController],
  providers: [
    ParcelService,
    StreetService,
    QuarterService,
    CommuneService,
    DistrictService,
  ],
})
export class ParcelModule {}
