import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    firstName?: string;

    @Prop({ type: String })
    lastName?: string;

    @Prop({ type: String })
    role?: string;

    @Prop({ type: [String], default: [] }) // Store multiple refresh tokens
    refreshTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);