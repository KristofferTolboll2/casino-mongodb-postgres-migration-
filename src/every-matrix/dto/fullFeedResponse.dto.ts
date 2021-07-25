import { Articles } from './../../articles/models/articles.entity';
import { Games } from './../../game/models/games.entity';
import { Everymatrixes } from './../models/everymatrixes.entity';
import { IsInt, IsNotEmpty } from 'class-validator';

export interface ArticleError {
  message: string;
  type: string;
}

export class FullFeedResponseDTO {
  @IsNotEmpty()
  everyMatrix: Everymatrixes;
  @IsNotEmpty()
  slotsCatalogGame: Games;
  @IsNotEmpty()
  ICRoboticsArticle: Articles | ArticleError;
  @IsNotEmpty()
  @IsInt()
  gameNumber: number;
  constructor(
    gameNumber: number,
    everyMatrix: Everymatrixes,
    slotsCatalog: Games,
    article: Articles | ArticleError,
  ) {
    this.gameNumber = gameNumber;
    this.everyMatrix = everyMatrix;
    this.slotsCatalogGame = slotsCatalog;
    this.ICRoboticsArticle = article;
  }
}
