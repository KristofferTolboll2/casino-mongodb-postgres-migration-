import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from 'src/game/game.service';
import { FullResponseDTO } from './dto/fullResponse.dto';
import { SearchEveryMatrixDTO } from './dto/searchEveryMatrix.dto';
import { EveryMatrixService } from './every-matrix.service';
import { everyMatrixDescriptions } from './everyMatrix.description';
@ApiTags('Every Matrix')
@Controller('everyMatrix')
export class EveryMatrixController {
  constructor(
    private readonly everyMatrixService: EveryMatrixService,
    private readonly gameService: GameService,
  ) {}

  @ApiOperation({
    description: everyMatrixDescriptions.names,
  })
  @Get('/names')
  async getEveryMatrixnames(@Query('limit') limit?: number) {
    const parsedLimit = limit && Number(limit);
    const response = await this.everyMatrixService.getNames(parsedLimit);
    return response;
  }

  @ApiOperation({
    description: everyMatrixDescriptions.everyMatrix,
  })
  @ApiResponse({ status: 200, description: 'Result was queried succesfully' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, please try again',
  })
  @Get()
  async getEveryMatrixDocuments(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    const everyMatrixDocuments =
      await this.everyMatrixService.getEveryMatrixDocuments(
        parsedLimit,
        parsedOffset,
      );
    return everyMatrixDocuments;
  }

  /**
   * Full feed til Daniel
   */
  @ApiOperation({
    description: everyMatrixDescriptions.fullFeed,
  })
  @Get('/fullFeed')
  async getFullFeed(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    const responses = await this.everyMatrixService.getFullFeedResponse(
      parsedLimit,
      parsedOffset,
    );
    return responses;
  }

  /**
   * Full feed to Marc
   * @param offset
   * @param limit
   * @returns
   */
  @Get('/robotics')
  async getRobotics(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const parsedOffset = Number(offset);
    const parsedLimit = Number(limit);
    const fullResponse: FullResponseDTO[] =
      await this.everyMatrixService.getFullResponse(parsedOffset, parsedLimit);

    const flattenedResponse = [].concat(...fullResponse);
    const nestedFlattednResponse = [].concat(...flattenedResponse);
    return nestedFlattednResponse;
  }

  @Get('robotics/id')
  async getEveryMatrixById(@Query('id') id: number) {
    const parsedId = Number(id);
    const foundDocument = await this.everyMatrixService.getFullResponseById(
      parsedId,
    );

    const flattenedResponse = [].concat(
      ...foundDocument.values,
      foundDocument.slotsCatalogGame,
    );

    return flattenedResponse;
  }

  @Get('/name/:name')
  async getEveryMatrixByName(@Param('name') name: string) {
    const foundDocument =
      await this.everyMatrixService.getMultipleEveryMatrixByName(name);
    return foundDocument;
  }

  //data by name endpoint
  /*
    @Get('/robotics/name/:name')
    async getEveryMatrixRoboticsByName(@Param('name') name: string) {
      const foundRobotics = await this.everyMatrixService.getEveryMatrixRoboticsByName(
        name,
      );
      return foundRobotics;
    }
    */

  //search endpoint
  @Get('/robotics/search')
  async searchEveryMatrix(@Query('query') name: string) {
    const foundDocument = await this.everyMatrixService.getEveryMatrixByName(
      name,
    );
    if (!foundDocument) {
      throw new NotFoundException('EveryMatrix not found');
    }
    return [
      new SearchEveryMatrixDTO(foundDocument.everyMatrixId, foundDocument.name),
    ];
  }

  //data by id endpoint
  /*
    @Get('/robotics/')
    async getEveryMatrixRoboticsById(@Query('id') id: number) {
      const parsedId = Number(id);
      const foundRobotics = await this.everyMatrixService.getEveryMatrixRoboticsById(
        parsedId,
      );
      return foundRobotics;
    }
    */
}
