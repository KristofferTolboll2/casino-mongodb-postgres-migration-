import { Providers } from './../../provider/models/providers.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'Games' })
export class Games extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  providerAmount: number;

  @Column({ nullable: true })
  RTP: string;

  @Column({ nullable: true })
  'Max Win': string;

  @Column({ nullable: true })
  'Min Bet': string;

  @Column({ nullable: true })
  volatility: string;

  @Column({ nullable: true })
  betways: string;

  @Column({ nullable: true })
  release: string;

  @Column({ nullable: true })
  devices: string;

  @Column({ nullable: true })
  gameReel: string;

  gameNumber?: number;

  @Column({ type: 'text', array: true })
  features: string[];

  @Column({ type: 'text', array: true })
  themes: string[];

  @Column({ type: 'text', array: true })
  objects: string[];

  @Column({ type: 'text', array: true })
  others: string[];

  @ManyToMany(() => Providers)
  @JoinTable()
  providers: Providers[];
}
