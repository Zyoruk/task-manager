// src/app/schemas/blacklisted-token.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlacklistedTokenDocument = BlacklistedToken & Document;

@Schema()
export class BlacklistedToken {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ default: Date.now })
  exp: Date;
}

export const BlacklistedTokenSchema = SchemaFactory.createForClass(BlacklistedToken);
