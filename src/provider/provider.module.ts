import { Module, forwardRef } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './models/providers.entity';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Providers]),
    forwardRef(() => GameModule),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
