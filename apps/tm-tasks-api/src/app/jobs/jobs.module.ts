import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { TaskReminderService } from './services/tasks-reminder.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    NotificationsModule,
    TasksModule,
    ScheduleModule.forRoot()
  ],
  providers: [TaskReminderService],
  exports: [TaskReminderService, ScheduleModule]
})
export class JobsModule {}
