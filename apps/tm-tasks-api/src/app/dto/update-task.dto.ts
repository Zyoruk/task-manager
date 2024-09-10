import { IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateTaskDTO } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDTO extends CreateTaskDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dueDate: string;
}
