import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateTaskDTO } from '../../dto/create-task.dto';
import { Task } from '../schemas/task';
import { IUser } from '../../types/user';
import { UpdateTaskDTO } from '../../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    public notificationsServiceClient: ClientProxy,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async createNewTask(task: CreateTaskDTO & { reportedBy: string }) {
    Logger.log(task);
    const newTask = new this.taskModel({ ...task, taskId: randomUUID() });
    try {
      await newTask.save();
      this.notificationsServiceClient.emit('task', {
        action: 'create',
        payload: newTask,
      });
      return newTask;
    } catch (error) {
      Logger.error('Failed to create task');
      Logger.debug(error);
      throw new Error(error);
    }
  }

  async getAll(user: IUser) {
    try {
      const allTasks = await this.taskModel
        .find({
          $or: [{ reportedBy: user._id }, { assignedTo: user._id }],
        })
        .exec();
      return allTasks;
    } catch (error) {
      Logger.error('Failed to get all tasks');
      Logger.debug(error);
      throw new Error(error);
    }
  }

  async deleteTask(taskId: string, userContext: IUser) {
    try {
      const deletedResult = await this.taskModel
        .deleteOne({
          taskId,
          $or: [
            { reportedBy: userContext._id },
            { assignedTo: userContext._id },
          ],
        })
        .exec();
      return deletedResult;
    } catch (error) {
      Logger.error('Failed to delete task');
      Logger.debug(error);
      throw new Error(error);
    }
  }

  getTask(taskId: string, userContext: IUser) {
    try {
      const task = this.taskModel.findOne({
        taskId,
        $or: [{ reportedBy: userContext._id }, { assignedTo: userContext._id }],
      });
      return task;
    } catch (error) {
      Logger.error('Failed to get task');
      Logger.debug(error);
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
      return updatedTask;
    } catch (error) {
      Logger.error('Failed to update task');
      Logger.debug(error);
      throw new Error(error);
    }
  }
}
