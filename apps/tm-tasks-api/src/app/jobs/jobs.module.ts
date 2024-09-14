import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { TaskReminderService } from './services/tasks-reminder.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SettingsModule } from '../settings/settings.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    NotificationsModule,
    TasksModule,
    ScheduleModule.forRoot(),
    SettingsModule,
    AuthModule
  ],
  providers: [TaskReminderService],
  exports: [TaskReminderService, ScheduleModule]
})
export class JobsModule {}
