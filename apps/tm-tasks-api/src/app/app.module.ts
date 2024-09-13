import { Module, ValidationPipe } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { APP_PIPE } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { JobsModule } from './jobs/jobs.module';


@Module({
  imports: [
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
    HttpModule,
    AuthModule,
    ConfigModule,
    TasksModule,
    JobsModule
  ],
  controllers: [],
  providers: [
    JwtAuthGuard,
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
})
export class AppModule {}
