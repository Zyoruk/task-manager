import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserContext } from '../../auth/decorators/user-context.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { IUser } from '../../types/user';
import { TaskStatus } from '../models/task-status';
import { TasksService } from '../services/tasks.service';
import { Response } from 'express';
import { UserContextInterceptor } from '../../auth/interceptors/user-context.interceptor';
import { Task } from '../schemas/task';
import { UpdateTaskDTO } from '../../dto/update-task.dto';

@Controller('tasks')
@UseInterceptors(UserContextInterceptor)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiExtraModels(() => TaskStatus)
  @ApiBody({
    required: true,
    description: 'Task details',
    schema: {
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        dueDate: {
          type: 'string',
          format: 'date-time',
        },
        status: {
          enum: Object.values(TaskStatus),
          type: 'string',
        },
      },
      required: ['title', 'dueDate'],
    },
  })
  async createNewTask(
    @Body() createTaskDto: CreateTaskDTO,
    @Res() res: Response,
    @UserContext() userContext: IUser
  ) {
    try {
      const newTask = await this.tasksService.createNewTask(
        {
          ...createTaskDto,
          reportedBy: userContext._id,
        },
        userContext
      );
      return res.status(201).send(newTask);
    } catch (error) {
      return res.status(400).send({ message: 'Failed to create task', error });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllTasks(@UserContext() userContext: IUser) {
    return this.tasksService.getAll(userContext);
  }

  @Delete(':taskId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
  })
  async deleteTask(
    @Param('taskId') taskId: string,
    @UserContext() userContext: IUser
  ) {
    return this.tasksService.deleteTask(taskId, userContext);
  }

  @Put(':taskId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() task: UpdateTaskDTO,
    @UserContext() userContext: IUser
  ) {
    return this.tasksService.updateTask(taskId, task, userContext);
  }

  @Get(':taskId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTask(
    @Param('taskId') taskId: string,
    @UserContext() userContext: IUser
  ) {
    return this.tasksService.getTask(taskId, userContext);
  }
}
