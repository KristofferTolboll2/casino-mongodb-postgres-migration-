import { FutureGame, FutureGameSchema } from './schemas/futureGame.schema';
import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { Provider, ProviderSchema } from './schemas/provider.schema';
import { Log, LogSchema } from './schemas/logging.schema';
import { Casino, CasinoSchema } from './schemas/casino.schema';
import { Article, ArticleSchema } from './schemas/article.schema';
import {
  LastScapedDate,
  LastScrapedDateSchema,
} from './schemas/lastScrapedDate.scehma';
import { EveryMatrix, EveryMatrixSchema } from './schemas/everyMatrix.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Log.name, schema: LogSchema },
      { name: FutureGame.name, schema: FutureGameSchema },
      { name: LastScapedDate.name, schema: LastScrapedDateSchema },
      { schema: CasinoSchema, name: Casino.name },
      { name: Article.name, schema: ArticleSchema },
      { name: EveryMatrix.name, schema: EveryMatrixSchema },
    ]),
  ],
  controllers: [MigrationController],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {}
