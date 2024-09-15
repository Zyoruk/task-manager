import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from '../../tasks/services/tasks.service'; // Adjust path if needed
import { ClientProxy } from '@nestjs/microservices';
import { SettingsService } from '../../settings/services/settings.services';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TaskReminderService {
  private readonly logger = new Logger(TaskReminderService.name);

  constructor(
    private readonly tasksService: TasksService,
    @Inject('NOTIFICATIONS_SERVICE')
    public notificationsServiceClient: ClientProxy,
    private readonly settingsService: SettingsService,
    private readonly authService: AuthService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async sendTaskReminders() {
    this.logger.debug('Checking for tasks due soon...');
    let token: string;
    try {
      token = await this.authService.generateClientToken();
    } catch (error) {
      this.logger.error('Failed to generate token');
      return;
    }

    if (!token) {
      this.logger.error('Failed to generate token');
      return;
    }
    let enabledUsers: string[];
    try {
      enabledUsers = await this.settingsService.getSetting(
        'enableNotifications',
        token
      );
    } catch (error) {
      this.logger.error('Failed to get setting');
      return;
    }

    if (!enabledUsers) {
      this.logger.log('Notifications are disabled');
    }

    const dueTasks = await this.tasksService.getDue(); // Get tasks due within 24 hours
    this.logger.log(`Found ${dueTasks.length} tasks due soon`, dueTasks);
    for (const task of dueTasks) {
      try {
        if (task.assignedTo) {
          this.notificationsServiceClient.emit('task', {
            action: 'due',
            payload: {
              ...task,
              enableNotifications: enabledUsers.some(
                (user) => user === task.assignedTo.toString()
              ),
            },
          });
          this.logger.log(
            `Sent reminder for task ${task.taskId} to ${task.assignedTo}`
          );
        }
        if (task.reportedBy) {
          this.notificationsServiceClient.emit('task', {
            action: 'due',
            payload: {
              ...task,
              enableNotifications: enabledUsers.some(
                (user) => user === task.reportedBy.toString()
              ),
            },
          });
          this.logger.log(
            `Sent reminder for task ${task.taskId} to ${task.reportedBy}`
          );
        }
      } catch (error) {
        this.logger.error(
          `Failed to send reminder for task ${task.taskId}: ${error}`
        );
      }
    }
  }
}
