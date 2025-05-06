import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuItem2Document = MenuItem2 & Document;

@Schema({ timestamps: true })
export class MenuItem2 {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  isGlobal: boolean;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String || null, default: null })
  imageUrl: string | null;

  @Prop({ type: Boolean, default: true })
  isAvailable: boolean;

  @Prop({ type: Number, default: 1 })
  status: number;

  @Prop({ type: Number, default: 0 })
  popularity: number;

  @Prop({ required: true, default: 'en' })
  defaultLanguage: string;
}

export const MenuItem2Schema = SchemaFactory.createForClass(MenuItem2);
