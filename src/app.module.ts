import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndividModule } from './individ/individ.module';

@Module({
  imports: [IndividModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
