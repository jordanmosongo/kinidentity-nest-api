import { Module } from '@nestjs/common';
import { FamilyService } from './services/family.service';
import { FamilyController } from './controllers/family.controller';

@Module({
  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
