import { Providers } from './../../provider/models/providers.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Games' })
export class Games extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  image: string;

  @Column()
  rank: number;

  @Column()
  providerAmount: number;

  @Column()
  RTP: string;

  @Column()
  'Max Win': string;

  @Column()
  'Min Bet': string;

  @Column()
  volatility: string;

  @Column()
  betways: string;

  @Column()
  release: string;

  @Column()
  devices: string;

  @Column({ type: 'jsonb', array: true })
  providers: Providers[];

  @Column()
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
}
