import { Test, TestingModule } from '@nestjs/testing';
import { IndividController } from './individ.controller';

describe('IndividController', () => {
  let controller: IndividController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividController],
    }).compile();

    controller = module.get<IndividController>(IndividController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
