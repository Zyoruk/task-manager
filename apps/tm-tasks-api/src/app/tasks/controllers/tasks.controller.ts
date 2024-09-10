import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
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
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UserContext } from '../../auth/decorators/user-context.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { IUser } from '../../types/user';
import { TaskStatus } from '../models/task-status';
import { TasksService } from '../services/tasks.service';
import { Response } from 'express';
import { UserContextInterceptor } from '../../auth/interceptors/user-context.interceptor';
import { UpdateTaskDTO } from '../../dto/update-task.dto';
import { TaskDTO } from '../../dto/task.dto';
import { HttpStatusCode } from 'axios';
import { DeletedTaskDTO } from '../../dto/deleted-task.dto';

@ApiTags('tasks')
@Controller('tasks')
@UseInterceptors(UserContextInterceptor)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBearerAuth()
  @ApiExtraModels(() => TaskStatus)
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: TaskDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to create task',
  })
  async createNewTask(
    @Body() createTaskDto: CreateTaskDTO,
    @Res() res: Response,
    @UserContext() userContext: IUser
  ): Promise<Response<TaskDTO>> {
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
  @ApiOperation({ summary: 'Get all tasks for the user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Retrieved tasks successfully',
    type: [TaskDTO],
  })
  async getAllTasks(@UserContext() userContext: IUser): Promise<TaskDTO[]> {
    return (await this.tasksService.getAll(userContext)).map((task) => {
      return TaskDTO.mapFromModel(task);
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
    type: DeletedTaskDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Param('id') taskId: string,
    @UserContext() userContext: IUser
  ): Promise<DeletedTaskDTO> {
    const deleted = await this.tasksService.deleteTask(taskId, userContext);
    if (deleted.deletedCount === 0)
      throw new HttpException(
        `Task ${taskId} not found`,
        HttpStatusCode.NotFound
      );
    Logger.log(`Deleted task ${taskId}`);
    Logger.debug(deleted);
    return { taskId };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskDTO,
  })
  async updateTask(
    @Param('id') taskId: string,
    @Body() task: UpdateTaskDTO,
    @UserContext() userContext: IUser
  ): Promise<TaskDTO> {
    try {
      const updatedTask = await this.tasksService.updateTask(
        taskId,
        task,
        userContext
      );
      return TaskDTO.mapFromModel(updatedTask);
    } catch (error) {
      Logger.error('Failed to update task');
      Logger.debug(error);
      throw new Error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: TaskDTO,
  })
  async getTask(
    @Param('id') taskId: string,
    @UserContext() userContext: IUser
  ): Promise<TaskDTO> {
    try {
      const foundTask = await this.tasksService.getTask(taskId, userContext);
      return TaskDTO.mapFromModel(foundTask);
    } catch (error) {
      Logger.error('Failed to get task');
      Logger.debug(error);
      throw new Error(error);
    }
  }
}
