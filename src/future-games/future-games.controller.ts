import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import { FutureGamesService } from './future-games.service';
@ApiTags('Future Games')
@Controller('futureGames')
export class FutureGamesController {
  private readonly logger = new Logger(FutureGamesController.name);
  constructor(private readonly futureGamesService: FutureGamesService) {}

  @Get()
  async getFutureGames(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const parsedStartDate = new Date(moment(startDate).toISOString());
    const parsedEndDate = new Date(moment(endDate).toISOString());
    const response = await this.futureGamesService.getFutureGamesByDate(
      parsedStartDate,
      parsedEndDate,
    );
    return response;
  }

  @Get('/robotics')
  async getFutureRoboticsGames(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const parsedStartDate = new Date(moment(startDate).toISOString());
    const parsedEndDate = new Date(moment(endDate).toISOString());
    const response = await this.futureGamesService.getFutureRoboticsGamesByDate(
      parsedStartDate,
      parsedEndDate,
    );
    return response;
  }

  @Get('/latest')
  async getLatestFutureGames() {
    const { message, futureGames } =
      await this.futureGamesService.getLatestFutureGames();
    this.logger.log(message);
    return futureGames;
  }
}
