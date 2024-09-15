import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    this.logger.debug('Auth Header: ' + authHeader);
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    const validateToken = await this.authService.validateToken(token);
    this.logger.debug('Token is valid: ' + validateToken);
    return validateToken;
  }
}
