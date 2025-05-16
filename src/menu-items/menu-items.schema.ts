import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema({ timestamps: true })
export class MenuItem {
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

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);