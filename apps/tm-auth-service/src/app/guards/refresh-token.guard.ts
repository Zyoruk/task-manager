import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {} // Inject AuthService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token missing or invalid format.');
    }

    const refreshToken = authorizationHeader.split(' ')[1];
    const isValid = await this.authService.validateToken(refreshToken); // Check blacklist

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    return true; 
  }
}
