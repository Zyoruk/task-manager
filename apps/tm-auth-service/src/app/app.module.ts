import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `mongodb://${configService.get(
            'MONGODB_USER'
          )}:${configService.get('MONGODB_PASSWORD')}@${configService.get(
            'MONGODB_HOST'
          )}:${configService.get('MONGODB_PORT')}/${configService.get(
            'MONGODB_TASKS_DB'
          )}`,
        };
      },
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE, // Register the ValidationPipe globally
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true, // Strip properties not in the DTO
        forbidNonWhitelisted: true, // Throw error for non-whitelisted properties
        transform: true, // Transform payload to DTO instance
        transformOptions: {
          enableImplicitConversion: true, // Enable type conversion (e.g., string to number)
        },
        validationError: {
          target: false, // Remove DTO properties from error response
          value: false, // Remove values from error response
        },
      }),
    },
  ],
  controllers: [AppController, AuthController],
})
export class AppModule {}
