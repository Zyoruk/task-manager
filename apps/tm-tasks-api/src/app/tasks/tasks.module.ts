import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task';
import { TasksController } from './controllers/tasks.controller';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    AuthModule,
  ],
  controllers: [ TasksController],
  providers: [TasksService],
  exports: [TasksService, MongooseModule],
})
export class TasksModule {}
