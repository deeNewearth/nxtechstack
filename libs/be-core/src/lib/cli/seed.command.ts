import { NestFactory } from '@nestjs/core';
import { BeCoreModule } from '../be-core.module';
import { MigrationService } from '../database/migration.service';

async function bootstrap() {
  const app = await NestFactory.create(BeCoreModule);
  const migrationService = app.get(MigrationService);
  await migrationService.seedDatabase();
  await app.close();
}

bootstrap();
