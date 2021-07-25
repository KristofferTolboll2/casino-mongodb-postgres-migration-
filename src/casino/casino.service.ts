import { Casinos, Country } from './models/casinos.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { casinoDataTypeMapper, IRobotics } from 'src/utilities/roboticsTypes';

@Injectable()
export class CasinoService {
  constructor(
    @InjectRepository(Casinos)
    private readonly casinoModel: Repository<Casinos>,
  ) {}

  private mapIRoboticsCasinos(casinos: Casinos[]): IRobotics[][] {
    const mappedCasinos = casinos.map((casino) => {
      return casinoDataTypeMapper(casino);
    });
    return mappedCasinos;
  }

  async getAllCasinos(limit: number, offset: number, isRobotics = false) {
    const casinos = await this.casinoModel.find({
      take: limit,
      skip: offset,
    });
    if (isRobotics) {
      return this.mapIRoboticsCasinos(casinos);
    }
    return casinos;
  }

  async searchRoboticsCasinos(limit: number, query: string) {
    if (limit) {
      const casinos = await this.casinoModel.find({
        where: [{ title: query }],
        take: limit,
      });
      return this.mapIRoboticsCasinos(casinos);
    } else {
      const casinos = await this.casinoModel.find({ title: query });
      return this.mapIRoboticsCasinos(casinos);
    }
  }

  async getCasinoById(id: string) {
    const foundCasino = await this.casinoModel.findOne(id);
    return foundCasino;
  }

  async searchRoboticsCasinosByCountry(
    country: Country,
    limit: number,
    query: string,
  ) {
    if (limit) {
      const casinos = await this.casinoModel.find({
        where: [{ country, title: query }],
        take: limit,
      });
      return this.mapIRoboticsCasinos(casinos);
    } else {
      const casinos = await this.casinoModel.find({ country, title: query });
      return this.mapIRoboticsCasinos(casinos);
    }
  }

  async getRoboticsCasinosByCountry(country: Country, limit: number) {
    if (limit) {
      const casinos = await this.casinoModel.find({
        where: [{ country }],
        take: limit,
      });
      return this.mapIRoboticsCasinos(casinos);
    } else {
      const casinos = await this.casinoModel.find({ country });
      return this.mapIRoboticsCasinos(casinos);
    }
  }
}
