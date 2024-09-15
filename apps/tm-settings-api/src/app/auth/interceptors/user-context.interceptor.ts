import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  private readonly logger = new Logger(UserContextInterceptor.name);
  constructor(private authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;
    if (!authToken) {
      return next.handle();
    }
    const token = authToken.split(' ')[1];
    const userData = await this.authService.getLoggerInUser(token);
    // Set the user context in a way that's accessible throughout your application
    request.userContext = userData;
    this.logger.log('Injected User Data: ' + JSON.stringify(request.userContext, null, 2));
    return next.handle();
  }
}
