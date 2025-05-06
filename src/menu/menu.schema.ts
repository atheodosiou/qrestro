import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema({ timestamps: true })
export class Menu {
  @Prop({ type: Map, of: String, required: true })
  name: Map<string, string>;

  @Prop({ type: Map, of: String, default: {} })
  description?: Map<string, string>;

  @Prop()
  imageUrl?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  popularity?: number;

  @Prop({ default: [] }) // If this is a menu secion ids here, we need to set it as ref. 
  sections?: any[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);