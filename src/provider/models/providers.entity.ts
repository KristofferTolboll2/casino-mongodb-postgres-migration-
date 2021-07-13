import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'Providers' })
export class Providers extends BaseEntity {}
