import { Controller, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserContextInterceptor } from './auth/interceptors/user-context.interceptor';

@Controller()
@UseInterceptors(UserContextInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
}
