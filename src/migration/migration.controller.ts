import { Controller, Post, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get()
  async testLogs() {
    return await this.migrationService.syncEveryMatrix();
  }
}
