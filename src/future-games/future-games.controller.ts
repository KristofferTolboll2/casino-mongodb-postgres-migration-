import { Controller } from '@nestjs/common';
import { FutureGamesService } from './future-games.service';

@Controller('future-games')
export class FutureGamesController {
  constructor(private readonly futureGamesService: FutureGamesService) {}
}
