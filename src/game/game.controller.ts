import { Controller, Get, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/robotics/random/:amount')
  async getRandomRoboticsGames(@Param('amount') amount: number) {
    const parsedAmount = Number(amount);
    const parsedGames = await this.gameService.getRandomGames(parsedAmount);
    return parsedGames;
  }

  @Get()
  async getGames(@Query('limit') limit: number) {
    const parsedNumber = Number(limit);
    return await this.gameService.getGames(parsedNumber);
  }

  @Get('/name/:name')
  async getGameByName(@Param('name') name: string) {
    const foundGame = await this.gameService.getGameByTitle(name, false);
    return foundGame;
  }

  @Get('/features/unique')
  async countUniqueFeatures() {
    const countedFeatures = await this.gameService.countFeatureFields();
    return countedFeatures;
  }

  //Get unique features and objects
  @Get('/unique')
  async uniqueFeaturesObjects() {
    return await this.gameService.getUniqueFeaturesObjects();
  }
}
