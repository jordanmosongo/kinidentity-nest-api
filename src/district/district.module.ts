import { Module } from '@nestjs/common';
import { DistrictService } from './services/district.service';
import { DistrictController } from './controllers/district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
