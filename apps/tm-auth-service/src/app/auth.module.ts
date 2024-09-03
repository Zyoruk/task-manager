import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { BlacklistedToken, BlacklistedTokenSchema } from './schemas/blacklisted-token.schema';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlacklistedToken.name, schema: BlacklistedTokenSchema}]),
    PassportModule,
    JwtModule.register({
      secret: process.env.AMAZING_SECRET, // Replace with a strong secret
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
