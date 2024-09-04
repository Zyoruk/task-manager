import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.log("Interceptor", [request.user, request.userContext])
    const user = request.user || {}; // Assuming your JWT strategy attaches the user object to the request

    // Set the user context in a way that's accessible throughout your application
    request.userContext = { 
      userId: user.userId, 
      email: user.email,
    };

    return next.handle();
  }
}
