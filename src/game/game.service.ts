import { Games } from './models/games.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  IRobotics,
  providerDataTypeMapperWrapper,
} from 'src/utilities/roboticsTypes';

@Injectable()
export class GameService {
  private featureFields: (keyof Games)[];

  constructor(
    @InjectRepository(Games) private readonly gameModel: Repository<Games>,
    private connection: Connection,
  ) {
    this.featureFields = ['features', 'others', 'themes'];
  }

  async saveGame(data) {
    return await this.gameModel.save(data);
  }

  async findAllGamesByPId(id: string): Promise<Games[]> {
    const games = await this.connection
      .getRepository(Games)
      .createQueryBuilder('games')
      .leftJoinAndSelect('games.providers', id)
      .getMany();
    // console.log(games);
    return games;
  }

  async getDistinct(field) {
    return await this.gameModel
      .createQueryBuilder(Games.name)
      .select(field)
      .distinct(true)
      .getRawMany();
  }

  async countFeatureFields() {
    const mappedStuff = this.featureFields.map(async (field) => {
      const distinctValues = (await this.getDistinct(field)) as string[];
      const parsedDistinctValues = distinctValues.filter(
        (entry) =>
          Boolean(entry) || (entry && entry.trim().toUpperCase() !== 'N/A'),
      );
      const values = await Promise.all(
        parsedDistinctValues.map(async (entry) => {
          // make life easier by not interpolating the asynchronous result.
          const count = await this.gameModel.count({ [field]: entry });
          const res = `${field}, ${entry}, ${count}`;
          return { [entry]: count };
        }),
      );
      return { [field]: values };
    });
    return Promise.all(mappedStuff);
  }

  async getGames(limit: number) {
    const games: Games[] = await this.gameModel.find({
      take: limit,
    });
    return games;
  }

  private async getUniqueValues(
    field: keyof Games,
  ): Promise<{ nameOfField: keyof Games; values: string[] }> {
    const distictValues = (await this.getDistinct(field)) as string[];
    const filteredValues = distictValues.filter(Boolean);
    return { nameOfField: field, values: filteredValues };
  }

  async getUniqueFeaturesObjects() {
    const mappedEntries = this.featureFields.map((entry) => {
      return this.getUniqueValues(entry);
    });
    return Promise.all(mappedEntries);
  }

  async getRandomGames(amount: number) {
    const games: Games[] = await this.gameModel.find({
      providerAmount: amount,
    });
    const transformedGames: IRobotics[][] = games.map((game, index) => {
      return providerDataTypeMapperWrapper(game, index);
    });
    return transformedGames;
  }

  async getGameByTitle(title: string, popualte: boolean) {
    console.log('title', title);
    console.log('popualte', popualte);
    if (!popualte) {
      const game = await this.gameModel.findOne({ title });
      return game;
    } else {
      const populatedGame = await this.gameModel.findOne(
        { title },
        {
          select: ['image', 'title', 'rank'],
        },
      );
      return populatedGame;
    }
  }
}
