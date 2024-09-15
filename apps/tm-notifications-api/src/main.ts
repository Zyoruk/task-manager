/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConfigModule } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  // Load environment variables
  ConfigModule.forRoot({
    isGlobal: true, // Make environment variables globally accessible
    envFilePath: ['.env'], // Load from the app's .env file
  });
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app)); // Use the Socket.IO adapter

  const mqUrls = [process.env.MQURL || 'amqp://localhost:5672'];
  const mqMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: mqUrls,
        queue: 'tm-notifications',
        queueOptions: {
          durable: false,
        },
      },
    });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  await mqMicroservice.listen();
  Logger.log(
    `🚀 HTTP Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`🚀 MQ Application is running!`);
}

bootstrap();
