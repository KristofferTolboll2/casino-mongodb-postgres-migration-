import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './models/articles.entity';
import { EveryMatrixModule } from 'src/every-matrix/every-matrix.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => EveryMatrixModule),
    LoggingModule,
    TypeOrmModule.forFeature([Articles]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
