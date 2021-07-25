import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EveryMatrixService } from 'src/every-matrix/every-matrix.service';
import { LoggingService } from 'src/logging/logging.service';
import { Repository } from 'typeorm';
import { Articles } from './models/articles.entity';
import * as chalk from 'chalk';
import axios from 'axios';

@Injectable()
export class ArticlesService {
  private ICRoboticsURL: string;
  private ICRoboticsTemplateNumber: number;
  private ICRobticsApiKey: string;

  constructor(
    @InjectRepository(Articles)
    private readonly articleModel: Repository<Articles>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EveryMatrixService))
    private readonly everyMatrixService: EveryMatrixService,
    private readonly loggingService: LoggingService,
  ) {
    this.ICRoboticsURL = this.configService.get<string>('ICROBOTICS_URL');
    this.ICRoboticsTemplateNumber = this.configService.get<number>(
      'ICROBOTICS_TEMPLATE_NUMBER',
    );
    this.ICRobticsApiKey = this.configService.get<string>('ICROBOTICS_API_KEY');
  }

  async makeICRoboticsRequest(contentId: number) {
    const url = `${this.ICRoboticsURL}/${this.ICRoboticsTemplateNumber}/generate`;
    try {
      const response = await axios.get(url, {
        params: {
          contentId,
        },
        headers: {
          'X-Api-Key': this.ICRobticsApiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.log(chalk.red('Error!'));
      console.error(error?.response?.data?.Message);
    }
  }

  async getArticleByEveryMatrixName(name: string) {
    console.log({ value: name });
    const document = await this.everyMatrixService.getEveryMatrixByName(name);

    if (!document) {
      const message = `Could not find game with name ${name}`;
      const mongoResponse = await this.loggingService.createArticleLog(
        message,
        name,
      );
      console.log('Could not found document ');
      return;
    }
    //console.log(document)
    console.log('after document');
    const id = document.everyMatrixId;
    console.log(id);
    return await this.getArticleById(id);
  }

  //check if the article is more than one week old and update conditionally
  async updateArticle(existingArticle: Articles, newArticle: Articles) {
    const oneWeekAgo = new Date().getDate() - 7;
    if (new Date(existingArticle['ic-timestamp']).getDate() >= oneWeekAgo) {
      const updatedModel = await this.articleModel.save(newArticle);
      return updatedModel;
    } else {
      return existingArticle;
    }
  }

  async persistArticle(article: Articles, everyMatrixId: number) {
    const everyMatrixModel = await this.everyMatrixService.getEveryMatrixById(
      everyMatrixId,
    );

    const existingArticle: Articles | null = await this.articleModel.findOne({
      everymatrix: everyMatrixModel,
    });

    //External service failed fallback and return article
    if (!article) {
      console.log('external service failed');
      console.log(existingArticle);
      return existingArticle;
    }

    if (existingArticle && article) {
      //TODO test and implement updateArticle function
      return await this.updateArticle(existingArticle, article);
    }
    console.log(article);
    article['everymatrix'] = everyMatrixModel;
    const articleModel = this.articleModel.save(article);
    return articleModel;
  }

  async getArticleById(id: number) {
    //contentId is the same as everyMatrixId in the database
    console.log('in get article');
    const responseData: Articles = await this.makeICRoboticsRequest(id);
    console.log(responseData);
    const mongoResponse = await this.persistArticle(responseData, id);
    return mongoResponse;
  }
}
