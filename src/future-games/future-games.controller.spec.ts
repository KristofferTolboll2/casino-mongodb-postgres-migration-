import { Test, TestingModule } from '@nestjs/testing';
import { FutureGamesController } from './future-games.controller';
import { FutureGamesService } from './future-games.service';

describe('FutureGamesController', () => {
  let controller: FutureGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutureGamesController],
      providers: [FutureGamesService],
    }).compile();

    controller = module.get<FutureGamesController>(FutureGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
