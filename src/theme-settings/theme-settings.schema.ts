import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ThemeSettingsDocument = ThemeSettings & Document;

@Schema({ timestamps: true })
export class ThemeSettings {
    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true, unique: true })
    venueId: Types.ObjectId;

    @Prop()
    primaryColor?: string;

    @Prop()
    font?: string;

    @Prop({ enum: ['classic', 'modern', 'compact'], default: 'classic' })
    layoutStyle?: 'classic' | 'modern' | 'compact';
}

export const ThemeSettingsSchema = SchemaFactory.createForClass(ThemeSettings);