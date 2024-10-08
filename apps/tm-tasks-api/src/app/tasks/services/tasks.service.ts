import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { Task } from '../schemas/task';
import { IUser } from '../../types/user';
import { UpdateTaskDTO } from '../../dto/update-task.dto';
import { TaskStatus } from '../models/task-status';
import { SortOrder as SortOrderOptions } from '../../types/sort-options';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    public notificationsServiceClient: ClientProxy,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async createNewTask(
    task: CreateTaskDTO & { reportedBy: string },
    userContext: IUser
  ) {
    this.logger.log(task);
    const newTask = new this.taskModel({ ...task, taskId: randomUUID() });
    try {
      await newTask.save();
      this.notificationsServiceClient.emit('task', {
        action: 'create',
        payload: newTask,
        userContext,
      });
      return newTask;
    } catch (error) {
      this.logger.error('Failed to create task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  async getAll(
    user: IUser,
    options: {
      page: number;
      limit: number;
      status?: TaskStatus;
      sortByDueDate?: SortOrderOptions;
      areDueInLastDays?: number;
    }
  ): Promise<Task[]> {
    const { page, limit, status, sortByDueDate } = options;
    const skip = (page - 1) * limit;

    const query: any = {
      $or: [{ reportedBy: user._id }, { assignedTo: user._id }],
      deleted: { $ne: true },
    };

    if (status) {
      query.status = status;
    }

    const sortOptions: any = {};
    if (sortByDueDate) {
      sortOptions.dueDate = sortByDueDate === SortOrderOptions.ASC ? 1 : -1;
    }

    if (options.areDueInLastDays) {
      query.dueDate = {
        $gte: new Date(Date.now() - options.areDueInLastDays * 24 * 60 * 60 * 1000),
      };
    }

    try {
      const allTasks = await this.taskModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec();

      return allTasks;
    } catch (error) {
      this.logger.error('Failed to get all tasks');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  async deleteTask(taskId: string, userContext: IUser) {
    try {
      const deletedResult = await this.taskModel.findOneAndUpdate(
        {
          taskId,
          $or: [
            { reportedBy: userContext._id },
            { assignedTo: userContext._id },
          ],
        },
        { deleted: true, deletedAt: new Date() }, // Mark as deleted
        { new: true }
      );

      if (!deletedResult) {
        // Handle case where task is not found or user is not authorized
        return { deletedCount: 0 };
      }

      this.notificationsServiceClient.emit('task', {
        action: 'delete',
        payload: {
          taskId,
        },
        userContext,
      });
      return { deletedCount: 1 }; // Indicate successful soft delete
    } catch (error) {
      this.logger.error('Failed to delete task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  getTask(taskId: string, userContext: IUser) {
    try {
      const task = this.taskModel.findOne({
        taskId,
        $or: [{ reportedBy: userContext._id }, { assignedTo: userContext._id }],
      });
      this.notificationsServiceClient.emit('task', {
        action: 'search',
        payload: task,
        userContext,
      });
      return task;
    } catch (error) {
      this.logger.error('Failed to get task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  updateTask(taskId: string, task: UpdateTaskDTO, userContext: IUser) {
    try {
      const updatedTask = this.taskModel.findOneAndUpdate(
        {
          taskId: taskId,
          $or: [
            { reportedBy: userContext._id },
            { assignedTo: userContext._id },
          ],
        },
        task,
        { new: true }
      );
      this.notificationsServiceClient.emit('task', {
        action: 'update',
        payload: updatedTask,
        userContext,
      });
      return updatedTask;
    } catch (error) {
      this.logger.error('Failed to update task');
      this.logger.debug(error);
      throw new Error(error);
    }
  }

  async getDue(
    options?: {
      areDueInNextHours?: number;
    }
  ): Promise<Task[]> {
    const { areDueInNextHours = 24 } = options || {};
    const query: any = {
      dueDate: {
        $lte: new Date(Date.now() + areDueInNextHours * 60 * 60 * 1000),
      },
      deleted: { $ne: true },
    };

    try {
      const allTasks = await this.taskModel
        .find(query)
        .exec();

      return allTasks;
    } catch (error) {
      this.logger.error('Failed to get all tasks');
      this.logger.debug(error);
      throw new Error(error);
    }
  }
}
