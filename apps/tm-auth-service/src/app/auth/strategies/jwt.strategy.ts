import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TM_WHISPER'),
    });
  }

  async validate(payload: any) {
    const isValid = await this.authService.validateToken(payload.token); // Check blacklist
    if (!isValid) {
      this.logger.log('Invalid token');
      throw new UnauthorizedException('Invalid token');
    }
    this.logger.log('Payload' + payload);
    // Fetch the complete user object based on the payload
    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      this.logger.log('User not found');
      throw new UnauthorizedException('user not found');
    }
    this.logger.log('User found' + user);
    return {
      _id: user._id,
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
