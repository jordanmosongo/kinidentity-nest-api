import { Module } from '@nestjs/common';
import { IndividsController } from './controllers/individs/individs.controller';
import { IndividsService } from './services/individs/individs.service';

@Module({
  controllers: [IndividsController],
  providers: [IndividsService],
})
export class IndividModule {}
