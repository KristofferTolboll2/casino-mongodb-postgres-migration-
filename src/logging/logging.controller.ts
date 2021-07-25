import { Controller, Get, Query } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  async getLogs(@Query('order') order: string) {
    const parsedOrder = order == 'ASC' || order == 'DESC' ? order : 'DESC';
    return await this.loggingService.getLogs(parsedOrder);
  }
}
