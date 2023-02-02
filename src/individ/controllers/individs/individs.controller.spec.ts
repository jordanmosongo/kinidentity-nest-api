import { Test, TestingModule } from '@nestjs/testing';
import { IndividsController } from './individs.controller';

describe('IndividsController', () => {
  let controller: IndividsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividsController],
    }).compile();

    controller = module.get<IndividsController>(IndividsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
