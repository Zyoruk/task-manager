import { Controller, Logger } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('task')
  async handleTaskEvent(data: any) {
    Logger.log('eventpattern', data);
    return this.appService.getData();
  }

  @MessagePattern({
    cmd: "update"
  })
  async handleTaskMessage(data: any) {
    Logger.log('messagepattern',data);
    return this.appService.getData();
  }
}
