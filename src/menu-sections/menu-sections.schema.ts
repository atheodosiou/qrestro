import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuSectionDocument = MenuSection & Document;

@Schema({ timestamps: true })
export class MenuSection {
    @Prop({ type: Map, of: String, required: true })
    title: Map<string, string>;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venueId: Types.ObjectId;

    @Prop({ default: 0 })
    order: number;

    @Prop({ required: true, default: 'en' })
    defaultLanguage: string;
}

export const MenuSectionSchema = SchemaFactory.createForClass(MenuSection);