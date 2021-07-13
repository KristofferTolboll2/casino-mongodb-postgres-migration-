import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loggings } from './models/loggings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loggings])],
  controllers: [LoggingController],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
