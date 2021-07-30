import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn('text')
  _id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  public timeCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public timeUpdatedAt: Date;
}
