import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CasinoModule } from './casino/casino.module';
import { EveryMatrixModule } from './every-matrix/every-matrix.module';
import { FutureGamesModule } from './future-games/future-games.module';
import { GameModule } from './game/game.module';
import { KeywordsModule } from './keywords/keywords.module';
import { LoggingModule } from './logging/logging.module';
import { ProviderModule } from './provider/provider.module';
import { MigrationModule } from './migration/migration.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    ArticlesModule,
    CasinoModule,
    EveryMatrixModule,
    FutureGamesModule,
    GameModule,
    KeywordsModule,
    LoggingModule,
    ProviderModule,
    MigrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
