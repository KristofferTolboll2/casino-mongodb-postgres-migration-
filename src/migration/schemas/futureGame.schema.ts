import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IFutureGame {
  providerName: string;
  thumbnail: string;
  title: string;
  color: {
    primary: string;
  };
  draggable: boolean;
  resizable: boolean;
  rating: string;
  startsAt: string;
  endsAt: string;
  url: string;
  calenderEventId: string;
  RTP: string;
}

@Schema({ collection: 'futuregames' })
export class FutureGame extends Document {
  @Prop({ unique: true, index: true, required: true })
  title: string;

  @Prop()
  startsAt: Date;

  @Prop()
  endsAt: Date;

  @Prop()
  color: string;

  @Prop()
  resizable: boolean;

  @Prop()
  draggable: boolean;

  @Prop({ trim: true })
  rating: string;

  @Prop({ trim: true })
  url: string;

  @Prop({ trim: true })
  RTP: string;
}

// export type FutureGameDocument = FutureGame & Document;

export const FutureGameSchema = SchemaFactory.createForClass(FutureGame);
