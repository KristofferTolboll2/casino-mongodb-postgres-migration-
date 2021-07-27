import { Loggings, LoggingType } from './models/loggings.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(Loggings)
    private readonly loggingModel: Repository<Loggings>,
  ) {}

  async saveLogs(data) {
    return await this.loggingModel.save(data);
  }

  async createArticleLog(message: string, entityName: string) {
    return await this.createLog(LoggingType.ARTICLE, message, entityName);
  }

  private async createLog(
    loggingType: LoggingType,
    message: string,
    entityName: string,
    ipAddress: string = null,
  ) {
    const response = await this.loggingModel.save({
      loggingType,
      message,
      ipAddress,
      entityName,
    });
    return response;
  }

  async getLogs(order: 'ASC' | 'DESC' = 'DESC') {
    return await this.loggingModel.find({ order: { timeCreatedAt: order } });
  }
}
