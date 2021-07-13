import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'Loggings' })
export class Loggings extends BaseEntity {}
