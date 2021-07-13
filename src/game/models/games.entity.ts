import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'Games' })
export class Games extends BaseEntity {}
