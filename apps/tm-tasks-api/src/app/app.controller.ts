import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createNewTask() {
    return this.appService.createNewTask();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
