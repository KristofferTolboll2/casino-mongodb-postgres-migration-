import { Games } from 'src/game/models/games.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { FutureGamesService } from './../future-games/future-games.service';
import { GameService } from 'src/game/game.service';
import { CasinoService } from './../casino/casino.service';
import { ProviderService } from './../provider/provider.service';
import { LoggingService } from './../logging/logging.service';
import { Game } from './schemas/game.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './schemas/logging.schema';
import { Provider } from './schemas/provider.schema';
import { FutureGame } from './schemas/futureGame.schema';
import { LastScapedDate } from './schemas/lastScrapedDate.scehma';
import { Casino } from './schemas/casino.schema';
import { Article } from './schemas/article.schema';
import { EveryMatrix } from './schemas/everyMatrix.schema';
import { EveryMatrixService } from 'src/every-matrix/every-matrix.service';

@Injectable()
export class MigrationService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<Log>,
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>,
    @InjectModel(Casino.name) private readonly casinoModel: Model<Casino>,
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @InjectModel(FutureGame.name)
    private readonly futureGameModel: Model<FutureGame>,
    @InjectModel(LastScapedDate.name)
    private readonly lastScapedDateModel: Model<LastScapedDate>,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    @InjectModel(EveryMatrix.name)
    private readonly everyMatrixModel: Model<EveryMatrix>,
    private readonly loggingService: LoggingService,
    private readonly providerService: ProviderService,
    private readonly casinoService: CasinoService,
    private readonly gameService: GameService,
    private readonly futureGamesService: FutureGamesService,
    private readonly articlesService: ArticlesService,
    private readonly everyMatrixService: EveryMatrixService,
  ) { }

  getJSON(data) {
    return JSON.parse(JSON.stringify(data));
  }

  async syncLogs() {
    const total = await this.logModel.estimatedDocumentCount();
    console.log('total document logs', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.logModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          const saveResult = await this.loggingService.saveLogs(
            this.getJSON(logs),
          );
          console.log('results', JSON.stringify(saveResult));
        }
        page++;
      }
    }
  }

  async syncProvides() {
    const total = await this.providerModel.estimatedDocumentCount();
    console.log('total document Provider', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.providerModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          const saveResult = await this.providerService.saveProviders(
            this.getJSON(logs),
          );
          console.log('results', JSON.stringify(saveResult));
        }
        page++;
      }
    }
  }

  async syncCasino() {
    const total = await this.casinoModel.estimatedDocumentCount();
    console.log('total document casino', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.casinoModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            const saveResult = await this.casinoService.save(
              this.getJSON(logs),
            );
            console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.log('e', JSON.stringify(e));
          }
        }
        page++;
      }
    }
  }

  async syncGame() {
    const total = await this.gameModel.estimatedDocumentCount();
    console.log('total document game', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.gameModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            const data = this.getJSON(logs);
            const newproviders = [];
            for (const pId of data.providers) {
              console.log(pId);
              const pData = await this.providerService.findOneProvider(pId);
              newproviders.push(pData);
            }
            data.providers = newproviders;
            // console.log('data', data);
            const saveResult = await this.gameService.saveGame(data);
            console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.error('e', JSON.stringify(e));
          }
        }
        page++;
      }
    }
  }

  async syncFutureGame() {
    const total = await this.futureGameModel.estimatedDocumentCount();
    console.log('total document Future Game', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.futureGameModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            const saveResult = await this.futureGamesService.save(
              this.getJSON(logs),
            );
            console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.error('e', e.message);
          }
        }
        page++;
      }
    }
  }

  async syncLastScapedDate() {
    const total = await this.lastScapedDateModel.estimatedDocumentCount();
    console.log('total document Last Scaped', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.lastScapedDateModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            const saveResult = await this.futureGamesService.saveLastScraped(
              this.getJSON(logs),
            );
            console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.error('e', e.message);
          }
        }
        page++;
      }
    }
  }

  async syncArticale() {
    const total = await this.articleModel.estimatedDocumentCount();
    console.log('total document Articale', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.articleModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            // console.log('results', logs);
            const saveResult = await this.articlesService.save(
              this.getJSON(logs),
            );
            // console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.error('e', e.message);
          }
        }
        page++;
      }
    }
  }

  async syncEveryMatrix() {
    const total = await this.everyMatrixModel.estimatedDocumentCount();
    console.log('total document Every Matrix', total);
    let page = 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    console.log('totalPages', totalPages);
    for (let index = 0; index <= totalPages; index++) {
      const results = await this.everyMatrixModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (results) {
        // save to postgres
        for (const logs of results) {
          try {
            // console.log('results', logs);
            const saveResult = await this.everyMatrixService.save(
              this.getJSON(logs),
            );
            console.log('results', JSON.stringify(saveResult));
          } catch (e) {
            console.error('e', e.message);
          }
        }
        page++;
      }
    }
  }
}
