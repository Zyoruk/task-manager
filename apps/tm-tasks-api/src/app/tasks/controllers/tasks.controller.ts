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
  Query,
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
  ApiQuery,
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
import { SortOrder } from '../../types/sort-options';

@ApiTags('tasks')
@Controller()
@UseInterceptors(UserContextInterceptor)
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBearerAuth()
  @ApiExtraModels(() => TaskStatus)
  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'Task created successfully',
    type: TaskDTO,
  })
  @ApiResponse({
    status: HttpStatusCode.InternalServerError,
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
      return res.status(HttpStatusCode.Ok).send(newTask);
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .send({ message: 'Failed to create task', error });
    }
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks for the user' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of tasks per page',
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by task status',
    enum: TaskStatus,
  })
  @ApiQuery({
    name: 'sortByDueDate',
    required: false,
    description: 'Sort by due date (asc or desc)',
    enum: SortOrder,
  })
  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'Retrieved tasks successfully',
    type: [TaskDTO],
  })
  async getAllTasks(
    @UserContext() userContext: IUser,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: TaskStatus,
    @Query('sortByDueDate') sortByDueDate?: SortOrder
  ): Promise<TaskDTO[]> {
    const tasks = await this.tasksService.getAll(userContext, {
      page,
      limit,
      status,
      sortByDueDate,
    });
    return tasks.map((task) => TaskDTO.mapFromModel(task));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'Task deleted successfully',
    type: DeletedTaskDTO,
  })
  @ApiResponse({
    status: HttpStatusCode.NotFound,
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
    this.logger.log(`Deleted task ${taskId}`);
    this.logger.debug(deleted);
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
      this.logger.error('Failed to update task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatusCode.Ok,
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
      this.logger.error('Failed to get task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }
}
