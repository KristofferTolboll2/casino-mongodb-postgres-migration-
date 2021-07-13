import { Test, TestingModule } from '@nestjs/testing';
import { FutureGamesService } from './future-games.service';

describe('FutureGamesService', () => {
  let service: FutureGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutureGamesService],
    }).compile();

    service = module.get<FutureGamesService>(FutureGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
