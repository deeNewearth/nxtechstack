// apps/apis/src/main.ts

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MigrationService } from '@kiss/be-core';
import passport from 'passport';
import session from 'express-session';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:4000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });

  // Initialize session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secretKey',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Adjust as needed for development
    }),
  );

  // Initialize Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.init();

  // Run migrations
  const migrationService = app.get(MigrationService);
  await migrationService.onModuleInit();

  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
