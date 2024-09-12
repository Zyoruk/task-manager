import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../tasks/schemas/task';

export class TaskDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  taskId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  assignedTo?: string;

  @ApiProperty()
  reportedBy: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  status: string;

  static mapFromModel(model: Task): TaskDTO {
    const dto = new TaskDTO();
    dto._id = model._id.toString();
    dto.taskId = model.taskId;
    dto.title = model.title;
    dto.description = model.description;
    dto.assignedTo = model.assignedTo?.toString();
    dto.reportedBy = model.reportedBy?.toString();
    dto.dueDate = model.dueDate;
    dto.status = model.status;
    return dto;
  }
}
