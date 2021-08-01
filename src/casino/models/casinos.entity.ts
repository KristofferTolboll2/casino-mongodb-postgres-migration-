import { Games } from 'src/game/models/games.entity';
import { Providers } from 'src/provider/models/providers.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';

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

  @Column({ type: 'text', enum: Country })
  country: Country;

  @Column({ nullable: true })
  company: string;

  @Column('text', { array: true, nullable: true })
  jurisdiction: string[];

  @Column('text', { array: true, nullable: true })
  licenses: string[];

  @Column({ nullable: true })
  yearEstablished: number;

  @Column({ nullable: true })
  liveChat: boolean;

  @Column({ nullable: true })
  minDeposit: string;

  @Column({ nullable: true })
  maxDeposit: string;

  @Column('text', { array: true, nullable: true })
  currency: string[];

  @Column({ nullable: true })
  minWithdrawal: string;

  @Column('text', { array: true, nullable: true })
  langaugesSupported: string[];

  @Column({ nullable: true })
  affiliateUrl: string;

  @Column('text', { array: true, nullable: true })
  depositMethods: string[];

  @Column('text', { array: true, nullable: true })
  withdrawalMethods: string[];

  // @ManyToMany(() => Providers)
  // @JoinTable()
  // providers: Providers[];

  // @ManyToMany(() => Games)
  // @JoinTable()
  // games: Games[];
}
