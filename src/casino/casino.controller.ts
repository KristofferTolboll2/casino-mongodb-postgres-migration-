import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CasinoService } from './casino.service';
import { Country } from './models/casinos.entity';
@ApiTags('Casinos')
@Controller('casinos')
export class CasinoController {
  constructor(private readonly casinoService: CasinoService) {}

  @Get()
  async getAllCasinoes(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    return await this.casinoService.getAllCasinos(parsedLimit, parsedOffset);
  }

  @Get('/robotics')
  async getAllRoboticsCasinos(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('query') query: string,
    @Query('id') id: string,
  ) {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    const parsedQuery = query && query.length > 0 ? query : false;
    if (parsedQuery) {
      return await this.casinoService.searchRoboticsCasinos(
        parsedLimit,
        parsedQuery,
      );
    } else if (id) {
      return await this.casinoService.getCasinoById(id);
    } else {
      return await this.casinoService.getAllCasinos(
        parsedLimit,
        parsedOffset,
        true,
      );
    }
  }

  @Get('/robotics/:country')
  async getAllRoboticsCasinosByCountry(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Param('country') country: Country,
    @Query('query') query: string,
  ) {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    const parsedQuery = query && query.length > 0 ? query : false;
    console.log(country);
    console.log(Object.values(Country));
    if (!Object.values(Country).includes(country)) {
      const errorMsg = `Country code has to be one off ${Object.values(
        Country,
      ).map((country) => `${country}`)}`;
      throw new HttpException(errorMsg, HttpStatus.BAD_REQUEST);
    }
    if (parsedQuery) {
      return await this.casinoService.searchRoboticsCasinosByCountry(
        country,
        parsedLimit,
        parsedQuery,
      );
    } else {
      return await this.casinoService.getRoboticsCasinosByCountry(
        country,
        parsedLimit,
      );
    }
  }
}
