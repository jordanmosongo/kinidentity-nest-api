import { Module } from '@nestjs/common';
import { QuarterService } from './services/quarter.service';
import { QuarterController } from './controllers/quarter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quarter } from './entities/quarter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quarter])],
  controllers: [QuarterController],
  providers: [QuarterService],
})
export class QuarterModule {}
