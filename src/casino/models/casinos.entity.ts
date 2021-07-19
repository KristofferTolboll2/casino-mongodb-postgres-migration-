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

  // @Column()
  // jurisdiction: string[];

  // @Column()
  // licenses: string[];

  @Column()
  yearEstablished: number;

  @Column()
  liveChat: boolean;

  @Column()
  minDeposit: number;

  @Column()
  maxDeposit: number;

  // @Column()
  // currency: string[];

  @Column()
  minWithdrawal: number;

  // @Column()
  // langaugesSupported: string[];

  @Column()
  affiliateUrl: string;

  // @Column()
  // depositMethods: string[];

  // @Column()
  // withdrawalMethods: string[];

  // @Column()
  // providers: Providers[];

  // @Column()
  // games: Games[];
}
