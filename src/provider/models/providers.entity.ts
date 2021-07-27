import { Games } from 'src/game/models/games.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Providers' })
export class Providers extends BaseEntity {
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

  @Column({ nullable: true })
  casinoHyperLink: string;

  @Column({ type: 'text', array: true })
  games: Games[];
}
