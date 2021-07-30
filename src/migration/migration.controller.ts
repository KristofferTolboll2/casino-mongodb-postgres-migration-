import { Controller, Post, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get()
  async testLogs() {
    await this.migrationService.syncLogs();
    await this.migrationService.syncProvides();
    await this.migrationService.syncGame();
    // await this.migrationService.syncCasino();
    // await this.migrationService.syncFutureGame();
    // await this.migrationService.syncLastScapedDate();
    // await this.migrationService.syncEveryMatrix();
    // await this.migrationService.syncArticale();
    return { OK: 'OK' };
  }
}
