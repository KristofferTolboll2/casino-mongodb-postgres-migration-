import { Controller, Get, Query } from '@nestjs/common';
import { KeywordsService } from './keywords.service';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Get()
  async getKeywordTitle() {
    return this.keywordsService.getTitle();
  }

  @Get('/titles')
  async getTitles(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.keywordsService.getKeywordData(limit, offset);
  }
}
