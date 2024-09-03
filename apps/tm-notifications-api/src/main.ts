/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mqUrls = [process.env.MQURL || 'amqp://localhost:5672']
  const mqMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: mqUrls,
      queue: 'tm-notifications',
      queueOptions: {
        durable: false
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
  Logger.log(
    `🚀 MQ Application is running!`
  )
}

bootstrap();
