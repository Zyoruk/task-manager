import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { TaskStatus } from '../models/task-status';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Task {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  taskId: string; // Use a UUID generator for this

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false }) // Assuming you have a User model
  assignedTo?: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }) // Assuming you have a User model
  reportedBy: Types.ObjectId;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
