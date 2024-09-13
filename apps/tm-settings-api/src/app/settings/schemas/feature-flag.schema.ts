import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class FeatureFlag extends Document {
  @Prop({ required: true, unique: true })
  key: string; // Unique identifier for the feature flag (e.g., 'taskRemindersEnabled')

  @Prop({ type: [SchemaTypes.ObjectId], default: [] }) // Assuming user IDs are ObjectIds
  enabledForUsers: string[]; // Array of user IDs for whom the flag is enabled
}

export const FeatureFlagSchema = SchemaFactory.createForClass(FeatureFlag);
