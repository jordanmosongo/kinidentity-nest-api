import { Module } from '@nestjs/common';
import { QuarterService } from './services/quarter.service';
import { QuarterController } from './controllers/quarter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quarter } from './entities/quarter.entity';
import { CommuneService } from 'src/commune/services/commune.service';
import { Commune } from 'src/commune/entities/commune.entity';
import { District } from 'src/district/entities/district.entity';
import { DistrictService } from 'src/district/services/district.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quarter, Commune, District])],
  controllers: [QuarterController],
  providers: [QuarterService, CommuneService, DistrictService],
})
export class QuarterModule {}
