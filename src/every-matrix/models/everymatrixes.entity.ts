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

  // @Column()
  // restrictedTerritories?: string[];

  @Column()
  contentProvider: string;

  // @Column()
  // langauges?: string[];

  // @Column()
  // currencies?: string[];

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

  // @Column()
  // terminal?: string[];

  // @Column()
  // jurisdictions?: string[];

  // @Column()
  // freeSpin?: {
  //   support: boolean;
  //   supportFeatureBonus: boolean;
  // };

  // @Column()
  // hitFrequency?: {
  //   min: number;
  //   max: number;
  // };

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

  // @Column()
  // topPrize?: number[];

  // @Column()
  // defaultMaxBet?: {
  //   EUR: number;
  // };

  @Column()
  defaultMaxMultiplier?: number;

  // @Column()
  // categories: string[];

  // @Column()
  // defaultMaxWin?: {
  //   EUR: number;
  // };

  @Column()
  highStakeValue: boolean;

  @Column()
  vendorID: string;

  @Column()
  vendorDisplayName: string;

  @Column()
  gameBundleID: string;

  // @Column()
  // category?: {
  //   category: string;
  //   invoicingGroup: string;
  // };

  // @Column({ unique: true })
  // article: Articles;

  gameNumber?: number;
}
