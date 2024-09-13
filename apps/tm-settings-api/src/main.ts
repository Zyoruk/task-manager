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
  const app = await NestFactory.create(AppModule);
  const apiBasePath = process.env.API_BASE_PATH || ''; // Default to empty string
  const swaggerPath = `/docs`; 

  // Create Swagger options using package.json data
  const config = new DocumentBuilder()
    .setTitle(name) 
    .setDescription(description)
    .setVersion(version)
    .addTag('settings') 
    .addBearerAuth() 
    .addServer(apiBasePath + '/') // Set base path here
    .build();
  const port = process.env.PORT || 3000;

  // Create Swagger document and setup UI
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  // Provides context user to all endpoints
  app.use(cookieParser());
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
