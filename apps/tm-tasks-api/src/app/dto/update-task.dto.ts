import { IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateTaskDTO } from './create-task.dto';

export class UpdateTaskDTO extends CreateTaskDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;
}
