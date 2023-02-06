/* eslint-disable prettier/prettier */
import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { IndividsController } from './controllers/individs/individs.controller';
import { IndividsService } from './services/individs/individs.service';

@Module({
  controllers: [IndividsController],
  providers: [IndividsService],
})
export class IndividModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('individs');
  }
}
