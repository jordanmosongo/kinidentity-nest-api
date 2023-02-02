import { Module } from '@nestjs/common';
import { IndividController } from './controllers/individ/individ.controller';

@Module({
  controllers: [IndividController],
})
export class IndividModule {}
