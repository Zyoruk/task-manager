import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const logger = new Logger(UserContext.name);
    logger.log('UserContext > user information: ', request.userContext);
    if (!request.userContext) {
      throw new Error('User context not found');
    }
    return request.userContext;
  }
);
