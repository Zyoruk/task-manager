// src/app/refresh-token.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './services/auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AMAZING_SECRET,
      passReqToCallback: true, // Pass the request object to the validate function
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.headers.authorization?.split(' ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await this.authService.validateToken(refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { userId: payload.sub, email: payload.email, refreshToken };
  }
}
