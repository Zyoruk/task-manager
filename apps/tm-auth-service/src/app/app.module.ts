import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(
      'mongodb://newuser:newpassword@localhost:27017/taskmanagerdb'
    ), // Connect to MongoDB
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  providers: [AppService],
  controllers: [AppController, AuthController],
})
export class AppModule {}
