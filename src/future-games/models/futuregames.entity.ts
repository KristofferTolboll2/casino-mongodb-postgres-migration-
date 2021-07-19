import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Futuregames' })
export class Futuregames extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column()
  color: string;

  @Column()
  resizable: boolean;

  @Column()
  draggable: boolean;

  @Column()
  rating: string;

  @Column()
  url: string;

  @Column()
  RTP: string;
}
