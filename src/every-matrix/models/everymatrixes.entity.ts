import { Articles } from './../../articles/models/articles.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Everymatrixes' })
export class Everymatrixes extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  everyMatrixId: number;

  @Column()
  thumbnail: string;

  @Column()
  logo: string;

  @Column()
  ftp: number;

  @Column()
  fpp: number;

  @Column('text', { array: true })
  restrictedTerritories?: string[];

  @Column()
  contentProvider: string;

  @Column('text', { array: true })
  langauges?: string[];

  @Column('text', { array: true })
  currencies?: string[];

  @Column()
  description?: string;

  @Column()
  creationTime?: string;

  @Column()
  lastModified?: string;

  @Column()
  newGameExpiryTime?: string;

  @Column()
  width?: number;

  @Column()
  height?: number;

  @Column()
  license?: string;

  @Column()
  defaultCoin?: string;

  @Column('text', { array: true })
  terminal?: string[];

  @Column('text', { array: true })
  jurisdictions?: string[];

  @Column({ type: 'jsonb' })
  freeSpin?: {
    support: boolean;
    supportFeatureBonus: boolean;
  };

  @Column({ type: 'jsonb' })
  hitFrequency?: {
    min: number;
    max: number;
  };

  @Column()
  coefficient?: number;

  @Column()
  ranking?: number;

  @Column()
  fun?: boolean;

  @Column()
  anonymity?: boolean;

  @Column()
  realMoney?: boolean;

  @Column()
  jackpotType?: string;

  @Column()
  jackpotContribution?: number;

  @Column()
  jackpotContributionEnable?: boolean;

  @Column()
  bonusContribution?: number;

  @Column()
  overridable?: boolean;

  @Column()
  excluded?: boolean;

  @Column()
  gameName?: string;

  @Column()
  shortName?: string;

  @Column()
  playURL?: string;

  @Column()
  payout?: number;

  @Column({ type: 'int', array: true })
  topPrize?: number[];

  @Column({ type: 'jsonb' })
  defaultMaxBet?: {
    EUR: number;
  };

  @Column()
  defaultMaxMultiplier?: number;

  @Column({ type: 'text', array: true })
  categories: string[];

  @Column({ type: 'jsonb' })
  defaultMaxWin?: {
    EUR: number;
  };

  @Column()
  highStakeValue: boolean;

  @Column()
  vendorID: string;

  @Column()
  vendorDisplayName: string;

  @Column()
  gameBundleID: string;

  @Column({ type: 'jsonb' })
  category?: {
    category: string;
    invoicingGroup: string;
  };

  @Column({ type: 'jsonb', unique: true })
  article: Articles;

  gameNumber?: number;
}
