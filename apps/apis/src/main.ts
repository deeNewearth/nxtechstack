/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
//import { ConfigService } from "@nestjs/config";
import { MigrationService } from '@kiss/be-core';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Ensure this is at the very top

  console.log('APP_SECRET_KEY:', process.env.APP_SECRET_KEY); // Add this line for debugging

  const app = await NestFactory.create(AppModule);
  //const config = app.get(ConfigService);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // Ensure database connection is established
  await app.init();
  // Run migrations
  const migrationService = app.get(MigrationService);
  await migrationService.onModuleInit();
  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
