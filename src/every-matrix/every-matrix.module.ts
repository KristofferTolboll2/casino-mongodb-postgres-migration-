import { forwardRef, Module } from '@nestjs/common';
import { EveryMatrixService } from './every-matrix.service';
import { EveryMatrixController } from './every-matrix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Everymatrixes } from './models/everymatrixes.entity';
import { ArticlesModule } from 'src/articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from 'src/game/game.module';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Everymatrixes]),
    forwardRef(() => ArticlesModule),
    ConfigModule,
    GameModule,
    LoggingModule,
  ],
  controllers: [EveryMatrixController],
  providers: [EveryMatrixService],
  exports: [EveryMatrixService],
})
export class EveryMatrixModule {}
