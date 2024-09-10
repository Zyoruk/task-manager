import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    Logger.debug('Auth Header: ' + authHeader);
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    const validateToken = await this.authService.validateToken(token);
    Logger.debug('Token is valid: ' + validateToken);
    return validateToken;
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
      console.log({
        err,
        user,
        info,
        context,
        status
      })

      return super.handleRequest(err, user, info, context, status)
  }

}
