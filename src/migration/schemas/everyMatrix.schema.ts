import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Article } from './article.schema';

@Schema({ collection: 'everymatrixes' })
export class EveryMatrix extends Document {
  @Prop({ unique: true, index: true, required: true, trim: true })
  name: string;

  @Prop({ unique: true, index: true, required: true, trim: true })
  everyMatrixId: number;

  @Prop()
  thumbnail: string;

  @Prop()
  logo: string;

  @Prop()
  ftp: number;

  @Prop()
  fpp: number;

  @Prop()
  restrictedTerritories?: string[];

  @Prop()
  contentProvider: string;

  @Prop()
  langauges?: string[];

  @Prop()
  currencies?: string[];

  @Prop()
  description?: string;

  @Prop()
  creationTime?: string;

  @Prop()
  lastModified?: string;

  @Prop()
  newGameExpiryTime?: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  license?: string;

  @Prop()
  defaultCoin?: string;

  @Prop()
  terminal?: string[];

  @Prop()
  jurisdictions?: string[];

  @Prop({
    type: {
      support: Boolean,
      supportFeatureBonus: Boolean,
    },
  })
  freeSpin?: {
    support: boolean;
    supportFeatureBonus: boolean;
  };

  @Prop({
    type: {
      min: Number,
      max: Number,
    },
  })
  hitFrequency?: {
    min: number;
    max: number;
  };

  @Prop()
  coefficient?: number;

  @Prop()
  ranking?: number;

  @Prop()
  fun?: boolean;

  @Prop()
  anonymity?: boolean;

  @Prop()
  realMoney?: boolean;

  @Prop()
  jackpotType?: string;

  @Prop()
  jackpotContribution?: number;

  @Prop()
  jackpotContributionEnable?: boolean;

  @Prop()
  bonusContribution?: number;

  @Prop()
  overridable?: boolean;

  @Prop()
  excluded?: boolean;

  @Prop()
  gameName?: string;

  @Prop()
  shortName?: string;

  @Prop()
  playURL?: string;

  @Prop()
  payout?: number;

  @Prop()
  topPrize?: number[];

  @Prop({
    type: {
      EUR: Number,
    },
  })
  defaultMaxBet?: {
    EUR: number;
  };

  @Prop()
  defaultMaxMultiplier?: number;

  @Prop()
  categories: string[];

  @Prop({
    type: {
      EUR: Number,
    },
  })
  defaultMaxWin?: {
    EUR: number;
  };

  @Prop()
  highStakeValue: boolean;

  @Prop()
  vendorID: string;

  @Prop()
  vendorDisplayName: string;

  @Prop()
  gameBundleID: string;

  @Prop({
    type: {
      category: String,
      invoicingGroup: String,
    },
  })
  category?: {
    category: string;
    invoicingGroup: string;
  };

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Article', unique: true })
  article: Article;

  gameNumber?: number;
}

// export type EveryMatrixDocument = EveryMatrix & Document;

export const EveryMatrixSchema = SchemaFactory.createForClass(EveryMatrix);
