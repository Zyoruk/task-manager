import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TM_WHISPER'),
    });
  }

  async validate(payload: any) {
    this.logger.error(payload);
    try {
      const isValid = await this.authService.validateToken(payload.token);
      this.logger.error(isValid);
      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }
      this.logger.log(JSON.stringify(payload, null, 2));
      return {
        _id: payload._id,
        userId: payload.userId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Error validating token');
    }
  }
}
