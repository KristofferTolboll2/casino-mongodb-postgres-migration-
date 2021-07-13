import { Module } from '@nestjs/common';
import { FutureGamesService } from './future-games.service';
import { FutureGamesController } from './future-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Futuregames } from './models/futuregames.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Futuregames])],
  controllers: [FutureGamesController],
  providers: [FutureGamesService],
  exports: [FutureGamesService],
})
export class FutureGamesModule {}
