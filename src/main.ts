import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureEnvironment } from './enviroment';
import { Enviroment } from './enviroment';

const apiDescription = `
This API is used to expose all data, that is related to <a href="https://gurucasinobonus.com>GuruCasinoBonus</a>`;

export const ENV = Object.freeze(configureEnvironment(process.env.NODE_ENV));
export const isDevlopment = ENV === Enviroment.DEVELOPMENT;
const logger = new Logger('main.ts');

async function bootstrap() {
  console.log(isDevlopment);
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const configDoc = new DocumentBuilder()
    .setTitle('Vita Media - GuruCasinoBons ')
    .setDescription(apiDescription)
    .setVersion('1.1')
    .addTag(
      'GuruCasinoBonus feed',
      'Endpoints to retrieve data related to the Data Scraped and exposed by the GuruCasinoBonus project',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('PORT') || 3000);
  logger.debug(`Casino is listening to ${config.get('PORT')}`);
}
bootstrap();
