import { Games } from './../game/models/games.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { GameService } from 'src/game/game.service';
import { providerDataTypeMapperWrapper } from 'src/utilities/roboticsTypes';
import { EveryMatrixEntry } from './models/everyMatrixData.service';
import { Everymatrixes } from './models/everymatrixes.entity';
import { Repository } from 'typeorm';
import { ArticleError, FullFeedResponseDTO } from './dto/fullFeedResponse.dto';
import { IRoboticsEveryMatrix } from './parsing/IRobotics.';
import { FullResponseDTO } from './dto/fullResponse.dto';

@Injectable()
export class EveryMatrixService {
  constructor(
    @Inject(forwardRef(() => ArticlesService))
    private readonly articlesService: ArticlesService,
    @InjectRepository(Everymatrixes)
    private readonly everyMatrixModel: Repository<Everymatrixes>,
    private readonly gameService: GameService,
  ) {}

  private readonly logger = new Logger(EveryMatrixService.name);

  async getFullFeedResponse(
    limit: number,
    offset: number,
  ): Promise<FullFeedResponseDTO[]> {
    const foundEveryMatrixDocuments = await this.getEveryMatrix(offset, limit);
    console.log(foundEveryMatrixDocuments.length);
    const mappedResonse = Promise.all(
      foundEveryMatrixDocuments.map(async (everyMatrixDocument, index) => {
        everyMatrixDocument.gameNumber = index + 1;
        const foundGame = await this.gameService.getGameByTitle(
          everyMatrixDocument.gameName,
          true,
        );
        console.log(mappedResonse);

        let parsedGame;
        if (foundGame) {
          parsedGame = this.trimGameValues(
            this.renameObjectKey(foundGame, [
              { key: 'Max Win', newKey: 'MaxWin' },
              { key: 'Min Bet', newKey: 'MinBet' },
            ]),
          );
        }
        console.log(everyMatrixDocument.gameName);
        const foundArticle =
          await this.articlesService.getArticleByEveryMatrixName(
            everyMatrixDocument.gameName,
          );
        let articleError: ArticleError;
        if (foundArticle == undefined) {
          articleError = {
            message: `Article was not found ${everyMatrixDocument.gameName}`,
            type: 'Undefined Article',
          };
        }
        return new FullFeedResponseDTO(
          index + 1,
          everyMatrixDocument,
          parsedGame ? parsedGame : foundGame,
          articleError ? articleError : foundArticle,
        );
      }),
    );
    return await mappedResonse;
  }

  async getNames(limit?: number) {
    let names: string[];
    if (limit) {
      names = (
        await this.everyMatrixModel.find({
          take: limit,
        })
      ).map((entry) => entry.name);
    } else {
      names = (await this.everyMatrixModel.find()).map((entry) => entry.name);
    }
    const size = names.length;
    return { names, size };
  }

  async getAllEveryMatrixDocuments() {
    return await this.everyMatrixModel.find({});
  }

  async getEveryMatrixDocuments(limit: number, offset: number) {
    const everyMatrixDocuments = await this.everyMatrixModel.find({
      skip: offset,
      take: limit,
    });
    const mappedEntities = everyMatrixDocuments.map(
      (everyMatrixDocument, index) => ({
        ...everyMatrixDocument,
        gameNumber: index + 1,
      }),
    );

    return mappedEntities;
  }

  async getEveryMatrixById(id: number) {
    const foundDocument = await this.everyMatrixModel.findOne({
      everyMatrixId: id,
    });
    return foundDocument;
  }

  async getFullResponseById(id: number) {
    const foundDocument = await this.getEveryMatrixById(id);
    if (!foundDocument) {
      throw new NotFoundException('EveryMatrix not found');
    }

    const foundGame = await this.gameService.getGameByTitle(
      foundDocument.name,
      true,
    );

    return new FullResponseDTO(
      IRoboticsEveryMatrix.createFromeData(foundDocument).values.filter(
        (entry) => entry !== undefined,
      ),
      foundGame ? providerDataTypeMapperWrapper(foundGame, 0) : null,
    );
  }

  async getMultipleEveryMatrixByName(name: string) {
    const foundDocuments = await this.everyMatrixModel.find({
      name,
    });
    return foundDocuments;
  }

  async getEveryMatrixByName(name: string) {
    const foundDocument = await this.everyMatrixModel.findOne({
      name,
    });
    return foundDocument;
  }

  async getEveryMatrix(offset: number, limit: number) {
    return await this.everyMatrixModel.find({
      skip: offset,
      take: limit,
    });
  }

  private trimGameValues = (object: Games) => {
    Object.entries(object).forEach(([key, value]) => {
      if (typeof value === 'string') {
        object[key] = value.trim();
      }
    });
    return object;
  };

  private renameObjectKey = (
    object: Games,
    keys: { key: string; newKey: string }[],
  ) => {
    keys.forEach(({ key, newKey }) => {
      delete Object.assign(object, { [newKey]: object[key] })[key];
    });
    return object;
  };

  async createOrIgnoreEveryMatrixEntry(item: EveryMatrixEntry) {
    const { name, everyMatrixId } = item;
    const foundEntry = await this.everyMatrixModel.findOne({
      name,
      everyMatrixId,
    });
    if (!foundEntry) {
      this.logger.log('Creating entry with name ' + name);
      return await this.everyMatrixModel.create(item);
    } else {
      this.logger.log('Entry ' + name + ' already exists');
      return foundEntry;
    }
  }

  async getFullResponse(offset: number, limit: number) {
    const foundDocuments = await this.getEveryMatrix(offset, limit);
    const responseDTO: Promise<any>[] = await foundDocuments.map(
      async (foundDocument, index) => {
        const foundGame = await this.gameService.getGameByTitle(
          foundDocument.name,
          true,
        );

        let parsedGame: Games | null = null;
        if (foundGame) {
          parsedGame = this.trimGameValues(
            this.renameObjectKey(foundGame, [
              { key: 'Max Win', newKey: 'MaxWin' },
              { key: 'Min Bet', newKey: 'MinBet' },
            ]),
          );
        }
        return [
          IRoboticsEveryMatrix.createFromeData(foundDocument).values.filter(
            (entry) => entry !== undefined,
          ),
          foundGame
            ? providerDataTypeMapperWrapper(
                parsedGame ? parsedGame : foundGame,
                index,
                foundGame.title,
              )
            : {
                Type: 'Boolean',
                Name: `Slotscatalog`,
                Value: false,
                Description: 'Lorem Ipsum',
              },
        ];
      },
    );
    return Promise.all(responseDTO);
  }

  async getEveryMatrixRobotics(offset: number, limit: number) {
    const foundDocuments = await this.getEveryMatrix(offset, limit);
    return foundDocuments.map((foundDocument) => {
      return IRoboticsEveryMatrix.createFromeData(foundDocument).values.filter(
        (entry) => entry !== undefined,
      );
    });
  }

  async genericEveryMatrix(item: Everymatrixes) {
    return IRoboticsEveryMatrix.createFromeData(item).values.filter(
      (entry) => entry !== undefined,
    );
  }

  async getEveryMatrixRoboticsByName(name: string) {
    const foundDocument = await this.getEveryMatrixByName(name);
    if (!foundDocument) {
      throw new NotFoundException('EveryMatrix not found');
    }
    return IRoboticsEveryMatrix.createFromeData(foundDocument).values.filter(
      (entry) => entry !== undefined,
    );
  }

  async getEveryMatrixRoboticsById(id: number) {
    const foundDocument = await this.getEveryMatrixById(id);
    if (!foundDocument) {
      throw new NotFoundException('EveryMatrix not found');
    }
    return IRoboticsEveryMatrix.createFromeData(foundDocument).values.filter(
      (entry) => entry !== undefined,
    );
  }
}
