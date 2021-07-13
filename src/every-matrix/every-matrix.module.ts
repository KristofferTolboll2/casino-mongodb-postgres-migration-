import { Module } from '@nestjs/common';
import { EveryMatrixService } from './every-matrix.service';
import { EveryMatrixController } from './every-matrix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Everymatrixes } from './models/everymatrixes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Everymatrixes])],
  controllers: [EveryMatrixController],
  providers: [EveryMatrixService],
  exports: [EveryMatrixService],
})
export class EveryMatrixModule {}
