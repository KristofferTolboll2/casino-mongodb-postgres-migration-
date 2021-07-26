import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game } from './game.schema';

@Schema({ collection: 'providers' })
export class Provider extends Document {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  image: string;

  @Prop({ unique: true, required: true, index: true })
  title: string;

  @Prop()
  rank: number;

  @Prop()
  gameAmount: number;

  @Prop()
  casinoAmount: number;

  @Prop()
  gameHyperLink: string;

  @Prop()
  casinoHyperLink: string;

  @Prop({ type: [Types.ObjectId], ref: 'Game' })
  games: Game[];
}

// export type ProviderDocument = Provider & Document;

export const ProviderSchema = SchemaFactory.createForClass(Provider);
