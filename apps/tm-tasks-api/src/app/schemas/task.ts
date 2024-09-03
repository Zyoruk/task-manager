import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

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

  @Prop({ type: String, enum: ['BUG', 'FEATURE', 'TASK', 'EPIC', 'STORY'], required: true }) // Define your task types
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }) // Assuming you have a User model
  assignedTo: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }) // Assuming you have a User model
  reportedBy: Types.ObjectId;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Task' }) // For subtasks or linking tasks
  parentTasks?: Types.ObjectId[];

  @Prop({ type: [{ body: String, author: { type: MongooseSchema.Types.ObjectId, ref: 'User' }, createdAt: { type: Date, default: Date.now } }] })
  comments: {
    body: string;
    author: Types.ObjectId;
    createdAt: Date;
  }[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
