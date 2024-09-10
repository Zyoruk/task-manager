import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

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
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  providers: [AppService],
  controllers: [AppController, AuthController],
})
export class AppModule {}
