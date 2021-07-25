import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/name/:name')
  async getArticleByName(@Param('name') name: string) {
    return await this.articlesService.getArticleByEveryMatrixName(name);
  }

  @Get('/id/:id')
  async getArticleById(@Param('id') id: number) {
    const parsedId = Number(id);
    return await this.articlesService.getArticleById(parsedId);
  }

  @Get('/test/:name')
  async testICRoboticsServer(@Param('name') name: string) {
    const response = await this.articlesService.getArticleByEveryMatrixName(
      name,
    );
    console.log(response);
    return response;
  }
}
