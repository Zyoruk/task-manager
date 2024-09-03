import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { Task, TaskSchema } from './schemas/task';

@Injectable()
export class AppService {
  constructor(@Inject('NOTIFICATIONS_SERVICE') public notificationsServiceClient: ClientProxy, @InjectModel(Task.name) private taskModel: Model<Task>) { }

  createNewTask() {
    this.notificationsServiceClient.emit('task', {
      taskId: '123'
    })
  }

  getData() {
    this.notificationsServiceClient.emit('task', {
      taskId: '123'
    })
    return this.notificationsServiceClient.send(
      {
        cmd: "update",
      },
      {
        taskId: '123'
      }
    )
    return this.taskModel.find().exec();
  }
}
