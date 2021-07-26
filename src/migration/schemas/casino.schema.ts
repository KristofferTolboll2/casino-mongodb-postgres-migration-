import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game } from './game.schema';
import { Provider } from './provider.schema';

export enum Country {
  CANADA = 'CA',
  AUSTRALIA = 'AU',
  NEW_ZEALAND = 'NZ',
  USA = 'US',
}

@Schema({ collection: 'casinos' })
export class Casino extends Document {
  @Prop({ required: true, index: true, unique: true })
  title: string;

  @Prop({ type: String, enum: Country })
  country: Country;

  @Prop()
  company: string;

  @Prop({ trim: true })
  jurisdiction: string[];

  @Prop()
  licenses: string[];

  @Prop()
  yearEstablished: number;

  @Prop()
  liveChat: boolean;

  @Prop()
  minDeposit: number;

  @Prop()
  maxDeposit: number;

  @Prop()
  currency: string[];

  @Prop()
  minWithdrawal: number;

  @Prop()
  langaugesSupported: string[];

  @Prop({ trim: true })
  affiliateUrl: string;

  @Prop()
  depositMethods: string[];

  @Prop()
  withdrawalMethods: string[];

  @Prop({ type: [Types.ObjectId], ref: 'Provider' })
  providers: Provider[];

  @Prop({ type: [Types.ObjectId], ref: 'Game' })
  games: Game[];
}

// export type CasinoDocument = Casino & Document;

export const CasinoSchema = SchemaFactory.createForClass(Casino);
