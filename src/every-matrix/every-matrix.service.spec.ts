import { Test, TestingModule } from '@nestjs/testing';
import { EveryMatrixService } from './every-matrix.service';

describe('EveryMatrixService', () => {
  let service: EveryMatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EveryMatrixService],
    }).compile();

    service = module.get<EveryMatrixService>(EveryMatrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
