import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema({ timestamps: true })
export class MenuItem {
    @Prop({ type: Map, of: String, required: true })
    name: Map<string, string>;
  
    @Prop({ type: Map, of: String, default: {} })
    description?: Map<string, string>;
  
    @Prop()
    price?: number;
  
    @Prop()
    imageUrl?: string;
  
    @Prop({ type: Types.ObjectId, ref: 'MenuSection', required: true })
    sectionId: Types.ObjectId;
  
    @Prop({ default: true })
    isAvailable: boolean;
  
    @Prop()
    order?: number;
  
    @Prop({ required: true, default: 'en' })
    defaultLanguage: string;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);