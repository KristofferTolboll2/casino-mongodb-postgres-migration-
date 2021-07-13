import { BaseEntity } from 'src/utilities/models/base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'Casinos' })
export class Casinos extends BaseEntity {}
