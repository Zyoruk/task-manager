/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageJson from '../package.json'; // Import package.json
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // Load environment variables
  ConfigModule.forRoot({
    isGlobal: true, // Make environment variables globally accessible
    envFilePath: ['.env'], // Load from the app's .env file
  });

  // Extract metadata from package.json
  const { name, description, version } = packageJson;

  // Create Swagger options using package.json data
  const config = new DocumentBuilder()
    .setTitle(name) 
    .setDescription(description)
    .setVersion(version)
    .addTag('tasks') 
    .addBearerAuth() 
    .build();

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  // Create Swagger document and setup UI
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); 

  // Provides context user to all endpoints
  app.use(cookieParser());
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
