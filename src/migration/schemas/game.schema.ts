import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Provider } from './provider.schema';

@Schema({ collection: 'games' })
export class Game extends Document {
  @Prop({ unique: true, index: true, required: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  rank: number;

  @Prop()
  providerAmount: number;

  @Prop()
  RTP: string;

  @Prop()
  'Max Win': string;

  @Prop()
  'Min Bet': string;

  @Prop()
  volatility: string;

  @Prop()
  betways: string;

  @Prop()
  release: string;

  @Prop()
  devices: string;

  @Prop({ type: [Types.ObjectId], ref: 'Provider' })
  providers: Provider[];

  @Prop()
  gameReel: string;

  gameNumber?: number;

  @Prop({ nullable: true, trim: true, index: true })
  features: string[];

  @Prop({ nullable: true, trim: true, index: true })
  themes: string[];

  @Prop({ nullable: true, trim: true })
  objects: string[];

  @Prop({ nullable: true, trim: true, index: true })
  others: string[];
}
// export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
