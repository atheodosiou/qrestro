import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema({ timestamps: true })
export class MenuItem {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

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
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);