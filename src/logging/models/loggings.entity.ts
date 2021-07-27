import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity, Column } from 'typeorm';

export enum LoggingType {
  ARTICLE = 'ARTICLE',
  GAME = 'GAME',
  EVERY_MATRIX = 'EVERY_MATRIX',
  OTHER = 'OTHER',
}

export interface ILog {
  loggingType: LoggingType;
  message: string;
  ipAddress?: string;
  createdAt: Date;
  entityName: string;
}

@Entity({ name: 'Loggings' })
export class Loggings extends BaseEntity {
  @Column({
    enum: LoggingType,
    default: LoggingType.OTHER,
  })
  loggingType: LoggingType;

  @Column()
  message: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  entityName: string;

  @Column()
  createdAt: Date;
}
