import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [KeywordsController],
  providers: [KeywordsService, ConfigService],
})
export class KeywordsModule {}
