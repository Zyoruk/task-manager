import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserContextInterceptor } from './auth/interceptors/user-context.interceptor';
import { UserContext } from './auth/decorators/user-context.decorator';

@Controller()
@UseInterceptors(UserContextInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createNewTask() {
    return this.appService.createNewTask();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getData(@UserContext() userContext: any) {
    return this.appService.getData();
  }
}
