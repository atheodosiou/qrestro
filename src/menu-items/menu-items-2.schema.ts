import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuItem2Document = MenuItem2 & Document;

@Schema({ timestamps: true })
export class MenuItem2 {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ default: false })
  isGlobal?: boolean;

  @Prop()
  price?: number;

  @Prop()
  imageUrl?: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: 1 })
  status: number;

  @Prop({ default: 0 })
  popularity?: number;

  @Prop({ required: true, default: 'en' })
  defaultLanguage: string;
}

export const MenuItem2Schema = SchemaFactory.createForClass(MenuItem2);
