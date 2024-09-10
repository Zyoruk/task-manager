import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private httpService: HttpService,
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
    Logger.error(payload);
    try {
      const isValid = await this.authService.validateToken(payload.token);
      Logger.error(isValid);
      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }
      return {
        userId: payload.sub,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException('Error validating token');
    }
  }
}
