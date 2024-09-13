import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from '../../tasks/services/tasks.service'; // Adjust path if needed
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskReminderService {
  private readonly logger = new Logger(TaskReminderService.name);

  constructor(
    private readonly tasksService: TasksService,
    @Inject('NOTIFICATIONS_SERVICE')
    public notificationsServiceClient: ClientProxy
  ) {}

  @Cron(CronExpression.EVERY_HOUR) // Run every hour
  async sendTaskReminders() {
    this.logger.debug('Checking for tasks due soon...');

    const dueTasks = await this.tasksService.getDue(); // Get tasks due within 24 hours

    for (const task of dueTasks) {
      try {
        this.notificationsServiceClient.emit('task', {
          action: 'due',
          payload: task,
        });
        this.logger.log(`Reminder sent for task: ${task.taskId}`);
      } catch (error) {
        this.logger.error(
          `Failed to send reminder for task ${task.taskId}: ${error}`
        );
      }
    }
  }
}
