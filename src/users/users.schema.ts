// src/users/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password?: string;

    @Prop()
    name?: string;

    // For later
    @Prop()
    googleId?: string;

    @Prop({ default: 'local', enum: ['local', 'google'] })
    provider: 'local' | 'google';

    @Prop({ default: 'owner', enum: ['owner', 'admin'] })
    role: 'owner' | 'admin';

    @Prop({ default: true })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
