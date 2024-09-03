import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenCleanupService } from './tasks/token-blacklist-cleanup.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://newuser:newpassword@localhost:27017/taskmanagerdb'), // Connect to MongoDB
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, TokenCleanupService],
})
export class AppModule {}
