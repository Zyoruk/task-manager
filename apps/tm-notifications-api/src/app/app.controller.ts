import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { Server } from 'socket.io';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  constructor(
    private readonly server: Server, // Inject the Socket.IO server
  ) {}

  @MessagePattern('task', Transport.RMQ)
  handleTaskEvent(@Payload() data: any) {
    this.logger.log(`Received task event: ${JSON.stringify(data)}`);

    if (data.action === 'due') {
      this.handleDueTask(data.payload);
    }
  }

  @MessagePattern('setting', Transport.RMQ)
  handleSettingEvent(@Payload() data: any) {
    this.logger.log(`Received setting event: ${JSON.stringify(data)}`);
  }

  private async handleDueTask(data: any) {
    // Access the setting directly from the message payload
    if (data.enableNotifications) {
      this.logger.log('Notifications are enabled for this task.')
      this.server.emit('dueTask', data.task);
    } else {
      this.logger.log('Notifications are disabled for this task.');
    }
  }
}
