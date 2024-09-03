import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AMAZING_SECRET, // Replace with a strong secret
    });
  }

  async validate(payload: any) {
    const isValid = await this.authService.validateToken(payload.token); // Check blacklist
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.sub, email: payload.email };
  }
}
