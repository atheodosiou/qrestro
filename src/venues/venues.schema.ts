import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VenueDocument = Venue & Document;

@Schema({ timestamps: true })
export class Venue {
    @Prop({ required: true, unique: true })
    slug: string;

    @Prop({ type: Map, of: String, default: {} })
    name: Map<string, string>;

    @Prop({ type: Map, of: String, default: {} })
    description?: Map<string, string>;

    @Prop()
    logoUrl?: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    ownerId: Types.ObjectId;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: true, default: 'en' })
    defaultLanguage: string;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
