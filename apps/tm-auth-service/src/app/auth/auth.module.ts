import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { BlacklistedToken, BlacklistedTokenSchema } from './schemas/blacklisted-token.schema';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: BlacklistedToken.name, schema: BlacklistedTokenSchema}]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.TM_WHISPER, // Replace with a strong secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
