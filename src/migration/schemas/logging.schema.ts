import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LoggingType {
  ARTICLE = 'ARTICLE',
  GAME = 'GAME',
  EVERY_MATRIX = 'EVERY_MATRIX',
  OTHER = 'OTHER',
}

export interface ILog {
  loggingType: LoggingType;
  message: string;
  ipAddress?: string;
  createdAt: Date;
  entityName: string;
}

@Schema({
  timestamps: { createdAt: true },
})
export class Log extends Document {
  @Prop({
    enum: LoggingType,
    default: LoggingType.OTHER,
  })
  loggingType: LoggingType;

  @Prop()
  message: string;

  @Prop({ required: false })
  ipAddress: string;

  @Prop()
  entityName: string;

  @Prop()
  createdAt: Date;
}

// export type LogDocument = Log & Document;

export const LogSchema = SchemaFactory.createForClass(Log);
