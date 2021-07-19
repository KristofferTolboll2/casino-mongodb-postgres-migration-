import { Games } from 'src/game/models/games.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Providers' })
export class Providers extends BaseEntity {
  @Column()
  _id: string;

  @Column()
  image: string;

  @Column({ unique: true })
  title: string;

  @Column()
  rank: number;

  @Column()
  gameAmount: number;

  @Column()
  casinoAmount: number;

  @Column()
  gameHyperLink: string;

  @Column()
  casinoHyperLink: string;

  @Column({ type: 'jsonb', array: true })
  games: Games[];
}
