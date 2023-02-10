import { Module } from '@nestjs/common';
import { CommuneService } from './services/commune.service';
import { CommuneController } from './controllers/commune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commune } from './entities/commune.entity';
import { DistrictService } from 'src/district/services/district.service';
import { District } from 'src/district/entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commune, District])],
  controllers: [CommuneController],
  providers: [CommuneService, DistrictService],
})
export class CommuneModule {}
