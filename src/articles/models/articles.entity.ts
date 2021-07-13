import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'Articles' })
export class Articles extends BaseEntity {}
