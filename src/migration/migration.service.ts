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
  ) {}

  async syncLogs() {
    const results = await this.logModel.find();
    if (results) {
    }
  }

  async syncProvides() {
    const results = await this.providerModel.find();
    if (results) {
    }
  }

  async syncCasino() {
    const results = await this.casinoModel.find();
    if (results) {
    }
  }

  async syncGame() {
    const results = await this.gameModel.find();
    if (results) {
    }
  }

  async syncFutureGame() {
    const results = await this.futureGameModel.find();
    if (results) {
    }
  }

  async syncLastScapedDate() {
    const results = await this.lastScapedDateModel.find();
    if (results) {
    }
  }

  async syncArticale() {
    const results = await this.articleModel.find();
    if (results) {
    }
  }

  async syncEveryMatrix() {
    const results = await this.everyMatrixModel.find();
    if (results) {
    }
  }
}
