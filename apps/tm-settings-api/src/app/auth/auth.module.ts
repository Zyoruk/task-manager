import { Module } from '@nestjs/common';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { UserContextInterceptor } from './interceptors/user-context.interceptor';

@Module({
    imports: [
      ConfigModule,
      PassportModule,
      HttpModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('TM_WHISPER'),
          signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
      }),
    ],
    providers: [JwtStrategy, AuthService, UserContextInterceptor],
    exports: [AuthService, JwtStrategy, UserContextInterceptor]
  })
  export class AuthModule {}
  