import { Articles } from './../../articles/models/articles.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'Everymatrixes' })
export class Everymatrixes extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  everyMatrixId: number;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @Column({ type: 'integer', nullable: true })
  ftp: number;

  @Column({ type: 'double precision', nullable: true })
  fpp: number;

  @Column('text', { array: true, nullable: true })
  restrictedTerritories: string[];

  @Column({ type: 'text', nullable: true })
  contentProvider: string;

  @Column('text', { array: true, nullable: true })
  langauges: string[];

  @Column('text', { array: true, nullable: true })
  currencies: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  creationTime: string;

  @Column({ type: 'text', nullable: true })
  lastModified: string;

  @Column({ type: 'text', nullable: true })
  newGameExpiryTime: string;

  @Column({ type: 'integer', nullable: true })
  width: number;

  @Column({ type: 'integer', nullable: true })
  height: number;

  @Column({ type: 'text', nullable: true })
  license: string;

  @Column({ type: 'integer', nullable: true })
  defaultCoin: number;

  @Column('text', { array: true, nullable: true })
  terminal: string[];

  @Column('text', { array: true, nullable: true })
  jurisdictions: string[];

  @Column({ type: 'jsonb', nullable: true })
  freeSpin: {
    support: boolean;
    supportFeatureBonus: boolean;
  };

  @Column({ type: 'jsonb', nullable: true })
  hitFrequency: {
    min: number;
    max: number;
  };

  @Column({ type: 'double precision', nullable: true })
  coefficient: number;

  @Column({ type: 'double precision', nullable: true })
  ranking: number;

  @Column({ type: 'boolean', nullable: true })
  fun: boolean;

  @Column({ type: 'boolean', nullable: true })
  anonymity: boolean;

  @Column({ type: 'boolean', nullable: true })
  realMoney: boolean;

  @Column({ type: 'text', nullable: true })
  jackpotType: string;

  @Column({ type: 'double precision', nullable: true })
  jackpotContribution: number;

  @Column({ type: 'double precision', nullable: true })
  jackpotContributionEnable: boolean;

  @Column({ type: 'double precision', nullable: true })
  bonusContribution: number;

  @Column({ type: 'boolean', nullable: true })
  overridable: boolean;

  @Column({ type: 'boolean', nullable: true })
  excluded: boolean;

  @Column({ type: 'text', nullable: true })
  gameName: string;

  @Column({ type: 'text', nullable: true })
  shortName: string;

  @Column({ type: 'text', nullable: true })
  playURL: string;

  @Column({ type: 'double precision', nullable: true })
  payout: number;

  @Column({ type: 'integer', array: true, nullable: true })
  topPrize: number[];

  @Column({ type: 'jsonb', nullable: true })
  defaultMaxBet: {
    EUR: number;
  };

  @Column({ type: 'double precision', nullable: true })
  defaultMaxMultiplier: number;

  @Column({ type: 'text', array: true, nullable: true })
  categories: string[];

  @Column({ type: 'jsonb', nullable: true })
  defaultMaxWin: {
    EUR: number;
  };

  @Column({ type: 'boolean', nullable: true })
  highStakeValue: boolean;

  @Column({ type: 'integer', nullable: true })
  vendorID: number;

  @Column({ type: 'text', nullable: true })
  vendorDisplayName: string;

  @Column({ type: 'text', nullable: true })
  gameBundleID: string;

  @Column({ type: 'jsonb', nullable: true })
  category: {
    category: string;
    invoicingGroup: string;
  };

  gameNumber?: number;

  @OneToMany(() => Articles, (article) => article.everymatrix)
  article: Articles[];
}
