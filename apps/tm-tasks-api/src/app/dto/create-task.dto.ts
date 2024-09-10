import { TaskStatus } from '../tasks/models/task-status';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
