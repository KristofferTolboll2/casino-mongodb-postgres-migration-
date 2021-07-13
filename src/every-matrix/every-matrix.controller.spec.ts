import { Test, TestingModule } from '@nestjs/testing';
import { EveryMatrixController } from './every-matrix.controller';
import { EveryMatrixService } from './every-matrix.service';

describe('EveryMatrixController', () => {
  let controller: EveryMatrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EveryMatrixController],
      providers: [EveryMatrixService],
    }).compile();

    controller = module.get<EveryMatrixController>(EveryMatrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
