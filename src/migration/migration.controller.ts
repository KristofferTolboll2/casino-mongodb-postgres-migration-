import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MigrationService } from './migration.service';
@ApiTags('Migration')
@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get()
  async testLogs() {
    // await this.migrationService.syncLogs();
    // await this.migrationService.syncProvides();
    // await this.migrationService.syncGame();
    // await this.migrationService.syncCasino();
    // await this.migrationService.syncFutureGame();
    await this.migrationService.syncLastScapedDate();
    // await this.migrationService.syncEveryMatrix();
    // await this.migrationService.syncArticale();
    return { OK: 'OK' };
  }
}
