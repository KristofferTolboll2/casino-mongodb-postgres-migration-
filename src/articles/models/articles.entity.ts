import { Everymatrixes } from './../../every-matrix/models/everymatrixes.entity';
import { BaseEntity } from 'src/utilities/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Articles' })
export class Articles extends BaseEntity {
  @Column({ type: 'text', unique: true })
  _id: string;

  @Column({ type: 'text' })
  'ic-timestamp': string;
  @Column({ type: 'text' })
  'ic-faq7answer': string;
  @Column({ type: 'text' })
  'ic-faq7question': string;
  @Column({ type: 'text' })
  'ic-faq6answer': string;
  @Column({ type: 'text' })
  'ic-faq6question': string;
  @Column({ type: 'text' })
  'ic-faq5answer': string;
  @Column({ type: 'text' })
  'ic-faq5question': string;
  @Column({ type: 'text' })
  'ic-faq4answer': string;
  @Column({ type: 'text' })
  'ic-faq4question': string;
  @Column({ type: 'text' })
  'ic-faq3answer': string;
  @Column({ type: 'text' })
  'ic-faq3question': string;
  @Column({ type: 'text' })
  'ic-faq2answer': string;
  @Column({ type: 'text' })
  'ic-faq2question': string;
  @Column({ type: 'text' })
  'ic-faq1answer': string;
  @Column({ type: 'text' })
  'ic-faq1question': string;
  @Column({ type: 'text' })
  'ic-faqheader': string;
  @Column({ type: 'text' })
  'ic-metadescription': string;
  @Column({ type: 'text' })
  'ic-metatitle': string;
  @Column({ type: 'text' })
  'ic-launch': string;
  @Column({ type: 'text' })
  'ic-gamesummary': string;
  @Column({ type: 'text' })
  'ic-claimbonus': string;
  @Column({ type: 'text' })
  'ic-brandedtext': string;
  @Column({ type: 'text' })
  'ic-casino-provider': string;
  @Column({ type: 'text' })
  'ic-vendor': string;
  @Column({ type: 'text' })
  'ic-gamecategories': string;
  @Column({ type: 'text' })
  'ic-bonusgames': string;
  @Column({ type: 'text' })
  'ic-spinsandvalues': string;
  @Column({ type: 'text' })
  'ic-payout': string;
  @Column({ type: 'text' })
  'ic-description': string;
  @Column({ type: 'text' })
  'ic-header': string;

  @Column({ type: 'jsonb' })
  everymatrix?: Everymatrixes;
}
