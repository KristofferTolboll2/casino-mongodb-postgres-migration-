import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Futuregames' })
export class Futuregames extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  startsAt: Date;

  @Column({ nullable: true })
  endsAt: Date;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  resizable: boolean;

  @Column({ nullable: true })
  draggable: boolean;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  RTP: string;
}
