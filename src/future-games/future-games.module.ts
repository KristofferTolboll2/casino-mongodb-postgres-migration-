import { EveryMatrixModule } from 'src/every-matrix/every-matrix.module';
import { Module } from '@nestjs/common';
import { FutureGamesService } from './future-games.service';
import { FutureGamesController } from './future-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Futuregames } from './models/futuregames.entity';
import { LastScapedDate } from './models/lastScrapedDate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Futuregames, LastScapedDate]),
    EveryMatrixModule,
  ],
  controllers: [FutureGamesController],
  providers: [FutureGamesService],
  exports: [FutureGamesService],
})
export class FutureGamesModule {}
