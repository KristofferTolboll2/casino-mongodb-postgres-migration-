import { Module } from '@nestjs/common';
import { CasinoService } from './casino.service';
import { CasinoController } from './casino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Casinos } from './models/casinos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Casinos])],
  controllers: [CasinoController],
  providers: [CasinoService],
  exports: [CasinoService],
})
export class CasinoModule {}
