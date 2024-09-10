import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { UserContextInterceptor } from './auth/interceptors/user-context.interceptor';
import { UserContext } from './auth/decorators/user-context.decorator';
import { IUser } from './types/user';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './tasks/models/task-status';
import { Response } from 'express';

@Controller()
@UseInterceptors(UserContextInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

}
