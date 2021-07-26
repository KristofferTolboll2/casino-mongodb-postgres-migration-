import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsDateString } from 'class-validator';

@Schema({ collection: 'lastscrapeddate' })
export class LastScapedDate extends Document {
  @IsDateString()
  @Prop()
  date: Date;
}

// export type LastScrapedDateDocument = LastScapedDate & Document;

export const LastScrapedDateSchema =
  SchemaFactory.createForClass(LastScapedDate);
