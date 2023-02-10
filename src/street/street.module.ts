import { Module } from '@nestjs/common';
import { StreetService } from './services/street.service';
import { StreetController } from './controllers/street.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Street } from './entities/street.entity';
import { Quarter } from 'src/quarter/entities/quarter.entity';
import { Commune } from 'src/commune/entities/commune.entity';
import { District } from 'src/district/entities/district.entity';
import { QuarterService } from 'src/quarter/services/quarter.service';
import { DistrictService } from 'src/district/services/district.service';
import { CommuneService } from 'src/commune/services/commune.service';

@Module({
  imports: [TypeOrmModule.forFeature([Street, Quarter, Commune, District])],
  controllers: [StreetController],
  providers: [StreetService, QuarterService, DistrictService, CommuneService],
})
export class StreetModule {}
