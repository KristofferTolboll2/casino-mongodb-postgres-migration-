import { IsDateString } from 'class-validator';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'LastScapedDate' })
export class LastScapedDate extends BaseEntity {
  @IsDateString()
  date: Date;
}
