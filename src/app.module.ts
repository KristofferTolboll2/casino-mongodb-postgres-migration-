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
import { ENV, isDevlopment } from './main';
import { ProviderModule } from './provider/provider.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        schema: isDevlopment ? (configService.get<string>("POSTGRES_SCHEMA_DEV") || 'public') : configService.get("POSTGRES_SCHEMA_PROD"),
        host: isDevlopment ? configService.get<string>('POSTGRES_HOST_DEV') : configService.get<string>("POSTGRES_HOST_PROD"),
        port: configService.get<number>('POSTGRES_PORT'),
        username: isDevlopment ? configService.get<string>('POSTGRES_USER_DEV') : configService.get<string>("POSTGRES_USER_PROD"),
        password: isDevlopment ? configService.get<string>('POSTGRES_PASSWORD_DEV') : configService.get<string>("POSTGRES_PASSWORD_PROD"),
        database: isDevlopment ? configService.get<string>('POSTGRES_DATABASE_DEV') : configService.get<string>("POSTGRES_DATABASE_PROD"),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    ArticlesModule,
    CasinoModule,
    EveryMatrixModule,
    FutureGamesModule,
    GameModule,
    KeywordsModule,
    LoggingModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
