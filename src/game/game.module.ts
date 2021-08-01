import { ProviderModule } from './../provider/provider.module';
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './models/games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Games]), ProviderModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
