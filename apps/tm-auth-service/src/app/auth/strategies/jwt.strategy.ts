import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TM_WHISPER'),
    });
  }

  async validate(payload: any) {
    const isValid = await this.authService.validateToken(payload.token); // Check blacklist
    if (!isValid) {
      console.log('Invalid token')
      throw new UnauthorizedException('Invalid token');
    }

    // Fetch the complete user object based on the payload
    const user = await this.userService.findUserById(payload.sub); 
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    
    return {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
