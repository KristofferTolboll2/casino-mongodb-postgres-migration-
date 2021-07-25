import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async getProviders(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('withGames') withGames: string,
  ) {
    const parsedWithGames = Boolean(JSON.parse(withGames));
    if (parsedWithGames) {
      return await this.providerService.getFullProviders(
        Number(offset),
        Number(limit),
      );
    } else {
      return await this.providerService.getProviders(
        Number(offset),
        Number(limit),
      );
    }
  }

  @Get('robotics')
  async getProvidersRobotics(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.providerService.getRoboticsProviders(
      Number(offset),
      Number(limit),
    );
  }

  @Get('robotics/random/:amount')
  async getRandomProvidersRobotics(@Param('amount') amount: number) {
    const parsedAmount = Number(amount);
    const response = await this.providerService.getRandom(parsedAmount);
    return response;
  }

  @Get('robotics/:name')
  async getRandomGamesByProviderName(@Param('name') name: string) {
    const RANDOM_AMOUNT = 3;
    const foundProvider =
      await this.providerService.getRandomGamesByProviderName(
        RANDOM_AMOUNT,
        name,
      );
    return foundProvider;
  }
}
