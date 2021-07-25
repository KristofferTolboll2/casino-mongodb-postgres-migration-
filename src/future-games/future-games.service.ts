import { Futuregames } from './models/futuregames.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LastScapedDate } from './models/lastScrapedDate.entity';
import moment from 'moment';
import { parseDateToFormat } from 'src/utilities/util';
import axios, { AxiosResponse } from 'axios';
import { inferredDataTypeMapper } from 'src/every-matrix/parsing/IRobotics.';

@Injectable()
export class FutureGamesService {
  private slotsCalenderUrl: string;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Futuregames)
    private readonly futureGameModel: Repository<Futuregames>,
    @InjectRepository(LastScapedDate)
    private readonly lastScrapedDateModel: Repository<LastScapedDate>,
  ) {
    this.slotsCalenderUrl = configService.get<string>(
      'SLOTS_CALENDER_FUTURE_GAMES_URL',
    );
  }

  async findExpiredFutureGames() {
    const parsedDate = moment().toDate();
    return await this.futureGameModel.find({
      where: [{ endsAt: { $lt: parsedDate } }],
      order: { endsAt: -1 },
    });
  }

  async getFutureGamesByDate(startDate: Date, endDate: Date) {
    const response = await this.futureGameModel.find({
      where: [
        {
          startsAt: {
            $gte: startDate,
          },
          endsAt: {
            $lte: endDate,
          },
        },
      ],
    });
    return response;
  }

  async insertOrUpdate(items: Futuregames[]) {
    const responses = [];
    for (const item of items) {
      const res = await this.insertOrUpdateFutureGame(item);
      responses.push(res);
    }
    return responses;
  }

  async resetLastUpdatedDate() {
    return await this.lastScrapedDateModel.save({
      date: new Date(),
    });
  }

  private async insertOrUpdateFutureGame(item: any) {
    const parsedDocument = {
      startsAt: new Date(item.startsAt),
      endsAt: new Date(item.endsAt),
      resizable: item.resizable,
      color: item.color.primary,
      draggable: item.draggable,
      title: item.title,
      rating: item.rating,
      url: item.url,
      RTP: item.RTP,
    };
    const response = await this.futureGameModel.save(parsedDocument);
    return response;
  }

  private async getLastScrapedDate(): Promise<Date> {
    console.log('date is ');
    const lastScrapedDate = await this.lastScrapedDateModel.findOne();
    if (!lastScrapedDate) {
      const result = await this.lastScrapedDateModel.save({ date: new Date() });
      return result.date;
    }
    return lastScrapedDate.date;
  }

  private async fetchSlotsCalenderData(startDate: Date, endDate: Date) {
    const parsedStartDate = parseDateToFormat('YYYYMMDD', startDate);
    const parsedEndDate = parseDateToFormat('YYYYMMDD', endDate);
    const slotsCalenderUrl = `${this.slotsCalenderUrl}?startDate=${parsedStartDate}&endDate=${parsedEndDate}`;
    const responseData: AxiosResponse<Futuregames[]> = await axios.get(
      slotsCalenderUrl,
    );
    //TODO: insert error handling
    return responseData;
  }

  private construcMessage(responses: any[]) {
    const resultsUpdated = responses.filter((entry) => entry.n === 1).length;
    const resultsFailed = responses.filter((entry) => entry.ok !== 1).length;
    return `Updated ${resultsUpdated} with ${resultsFailed} games failed to be persisted in database`;
  }

  async deleteExpiredGames(games: Futuregames[]) {
    return await this.futureGameModel.remove(games);
  }

  async getLatestFutureGames() {
    const lastScrapedDate = await this.getLastScrapedDate();
    const daysDifference = moment().diff(lastScrapedDate, 'days');

    if (daysDifference < 1) {
      const slotsCalenderData = await this.fetchSlotsCalenderData(
        moment().toDate(),
        moment().add(4, 'months').toDate(),
      );
      const responses = await this.insertOrUpdate(slotsCalenderData.data);
      const queriedGames = await this.getFutureGamesByDate(
        moment().toDate(),
        moment().add(4, 'months').toDate(),
      );
      return {
        message: this.construcMessage(responses),
        futureGames: queriedGames,
      };
    } else {
      const futureGames = await this.getFutureGamesByDate(
        moment().toDate(),
        moment().add(2, 'months').toDate(),
      );

      return { message: 'Games are not over 1 day old', futureGames };
    }
  }

  async getFutureRoboticsGamesByDate(startDate: Date, endDate: Date) {
    const futureGames = await this.getFutureGamesByDate(startDate, endDate);
    const ICRoboticsResponse = futureGames.map((futureGame) => {
      if (!futureGame) return;
      return Object.entries(futureGame).map(([key, value]) => {
        console.log(key);
        console.log(value);
        return inferredDataTypeMapper(key, value, '');
      });
    });
    return ICRoboticsResponse;
  }
}
