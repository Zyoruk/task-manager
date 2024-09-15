import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger(UserContext.name);
    const request: Request = ctx.switchToHttp().getRequest();
    logger.log('UserContext > user information: ', request.userContext);
    return request.userContext;
  }
);
