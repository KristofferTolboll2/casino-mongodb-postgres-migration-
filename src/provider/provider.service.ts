import { GameService } from 'src/game/game.service';
import { Repository } from 'typeorm';
import { Providers } from './models/providers.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import {
  IRobotics,
  providerDataTypeMapperWrapper,
} from 'src/utilities/roboticsTypes';
import { selectRandomFromList } from 'src/utilities/util';
import {
  generateRandomGuruCasinoGame,
  RandomGuruCasinoGame,
} from './models/randomGameProvider';

@Injectable()
export class ProviderService {
  private guruCasinoUrl: string;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Providers)
    private readonly providerModel: Repository<Providers>,
    private readonly gameService: GameService,
  ) {
    this.guruCasinoUrl = this.configService.get<string>('GURU_CASINO_BASE_URL');
  }

  async saveProviders(data) {
    return await this.providerModel.save(data);
  }

  async findOneProvider(id: string): Promise<Providers> {
    return await this.providerModel.findOne({ _id: id });
  }

  //populate to retrieve all relations
  async getFullProviders(offset: number, limit: number) {
    const provider = await this.providerModel.find({
      skip: offset,
      take: limit,
    });

    // for (const index in provider) {
    //   provider[index]['gamesall'] = this.gameService.findAllGamesByPId(
    //     provider[index]._id,
    //   );
    // }

    return provider;
  }

  async getProviders(offset: number, limit: number) {
    const providers = await this.providerModel.find({
      skip: offset,
      take: limit,
    });

    //remove providers from object
    const parsedProviders = providers.map((provider) => {
      return provider;
      // return _.omit(provider, ['games']);
    });

    return parsedProviders;
  }

  async getRandom(amount: number) {
    const providers = await this.providerModel.find({ gameAmount: amount });
    const transformedProviders: IRobotics[][] = providers.map(
      (provider, index) => {
        return providerDataTypeMapperWrapper(provider, index);
      },
    );
    return transformedProviders;
  }

  async getRoboticsProviders(
    offset: number,
    limit: number,
  ): Promise<IRobotics[][]> {
    const providers = await this.providerModel.find({
      skip: offset,
      take: limit,
    });
    const mappedDataPoints: IRobotics[][] = providers.map((provider, index) => {
      return providerDataTypeMapperWrapper(provider, index);
    });
    return mappedDataPoints;
  }

  async getRandomGamesByProviderName(
    amount: number,
    providerName: string,
  ): Promise<RandomGuruCasinoGame[]> {
    // const parsedProviderName = `\n${providerName}\n`;
    const parsedProviderName = providerName;
    const foundProvider = await this.providerModel.findOne({
      title: parsedProviderName,
    });
    console.log(foundProvider);

    const games = await this.gameService.findAllGamesByPId(foundProvider._id);

    if (!games) {
      throw new HttpException(
        'Provider does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const randomGames = selectRandomFromList(games, amount) as Providers[];
    const randomGuruCasinoGames = randomGames.map((game) => {
      const parsedGameTitle = game.title.replace(/\s+/g, '-').toLowerCase();
      return generateRandomGuruCasinoGame(this.guruCasinoUrl, parsedGameTitle);
    });
    return randomGuruCasinoGames;
  }
}
