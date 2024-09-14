import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    Logger.log(
      'UserContext > user information: ' +
        JSON.stringify(request.userContext, null, 2)
    );
    return request.userContext;
  }
);
