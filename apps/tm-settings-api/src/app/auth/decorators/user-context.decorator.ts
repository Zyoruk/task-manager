import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    Logger.log(
      'UserContext > user information: ' +
        JSON.stringify(request.userContext, null, 2)
    );
    if (!request.userContext) {
      throw new Error('User context not found');
    }
    return request.userContext;
  }
);
