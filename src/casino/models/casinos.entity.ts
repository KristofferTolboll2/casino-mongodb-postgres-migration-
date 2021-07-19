import { Games } from 'src/game/models/games.entity';
import { Providers } from 'src/provider/models/providers.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

export enum Country {
  CANADA = 'CA',
  AUSTRALIA = 'AU',
  NEW_ZEALAND = 'NZ',
  USA = 'US',
}

@Entity({ name: 'Casinos' })
export class Casinos extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ type: String, enum: Country })
  country: Country;

  @Column()
  company: string;

  @Column('text', { array: true })
  jurisdiction: string[];

  @Column('text', { array: true })
  licenses: string[];

  @Column()
  yearEstablished: number;

  @Column()
  liveChat: boolean;

  @Column()
  minDeposit: number;

  @Column()
  maxDeposit: number;

  @Column('text', { array: true })
  currency: string[];

  @Column()
  minWithdrawal: number;

  @Column('text', { array: true })
  langaugesSupported: string[];

  @Column()
  affiliateUrl: string;

  @Column('text', { array: true })
  depositMethods: string[];

  @Column('text', { array: true })
  withdrawalMethods: string[];

  @Column('text', { array: true })
  providers: Providers[];

  @Column('text', { array: true })
  games: Games[];
}
