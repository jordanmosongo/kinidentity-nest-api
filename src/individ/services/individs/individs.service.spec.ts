/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { IndividsService } from './individs.service';

describe('IndividsService', () => {
  let service: IndividsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividsService],
    }).compile();
    service = module.get<IndividsService>(IndividsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
