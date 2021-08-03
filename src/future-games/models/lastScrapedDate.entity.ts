import { IsDateString } from 'class-validator';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'LastScapedDate' })
export class LastScapedDate extends BaseEntity {
  @IsDateString()
  @Column({ type: 'timestamptz' })
  date: Date;
}
