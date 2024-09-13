import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ConfigModule,
  ],
  exports: [MongooseModule],
})
export class DBModule {}
