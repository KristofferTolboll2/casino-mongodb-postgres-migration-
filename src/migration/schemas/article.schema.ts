import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { EveryMatrix } from './everyMatrix.schema';

export interface IArticle {
  'ic-timestamp': string;
  'ic-faq7answer': string;
  'ic-faq7question': string;
  'ic-faq6answer': string;
  'ic-faq6question': string;
  'ic-faq5answer': string;
  'ic-faq5question': string;
  'ic-faq4answer': string;
  'ic-faq4question': string;
  'ic-faq3answer': string;
  'ic-faq3question': string;
  'ic-faq2answer': string;
  'ic-faq2question': string;
  'ic-faq1answer': string;
  'ic-faq1question': string;
  'ic-faqheader': string;
  'ic-metadescription': string;
  'ic-metatitle': string;
  'ic-launch': string;
  'ic-gamesummary': string;
  'ic-claimbonus': string;
  'ic-brandedtext': string;
  'ic-casino-provider': string;
  'ic-vendor': string;
  'ic-gamecategories': string;
  'ic-bonusgames': string;
  'ic-spinsandvalues': string;
  'ic-payout': string;
  'ic-description': string;
  'ic-header': string;
}

@Schema({ collection: 'articles' })
export class Article extends Document {
  //ISO date time stamp

  @Prop({ unique: true })
  _id: MongoSchema.Types.ObjectId;

  @Prop()
  'ic-timestamp': string;
  @Prop()
  'ic-faq7answer': string;
  @Prop()
  'ic-faq7question': string;
  @Prop()
  'ic-faq6answer': string;
  @Prop()
  'ic-faq6question': string;
  @Prop()
  'ic-faq5answer': string;
  @Prop()
  'ic-faq5question': string;
  @Prop()
  'ic-faq4answer': string;
  @Prop()
  'ic-faq4question': string;
  @Prop()
  'ic-faq3answer': string;
  @Prop()
  'ic-faq3question': string;
  @Prop()
  'ic-faq2answer': string;
  @Prop()
  'ic-faq2question': string;
  @Prop()
  'ic-faq1answer': string;
  @Prop()
  'ic-faq1question': string;
  @Prop()
  'ic-faqheader': string;
  @Prop()
  'ic-metadescription': string;
  @Prop()
  'ic-metatitle': string;
  @Prop()
  'ic-launch': string;
  @Prop()
  'ic-gamesummary': string;
  @Prop()
  'ic-claimbonus': string;
  @Prop()
  'ic-brandedtext': string;
  @Prop()
  'ic-casino-provider': string;
  @Prop()
  'ic-vendor': string;
  @Prop()
  'ic-gamecategories': string;
  @Prop()
  'ic-bonusgames': string;
  @Prop()
  'ic-spinsandvalues': string;
  @Prop()
  'ic-payout': string;
  @Prop()
  'ic-description': string;
  @Prop()
  'ic-header': string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'EveryMatrix' })
  everymatrix?: EveryMatrix;
}

// export type ArticleDocument = Article & Document;

export const ArticleSchema = SchemaFactory.createForClass(Article);
