import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BaseMigration } from './migrations/base.migration';
import { CreateSubscriberIndex } from './migrations/1_create_subscriber_index';
import { SeederFactory } from './seeders/seeder.factory';

@Injectable()
export class MigrationService implements OnModuleInit {
  private readonly logger = new Logger(MigrationService.name);
  private migrations: BaseMigration[];
  private seederFactory: SeederFactory;

  constructor(@InjectConnection() private connection: Connection) {
    this.migrations = [
      new CreateSubscriberIndex(this.connection),
      // Add more migrations here
    ];
    this.seederFactory = new SeederFactory(this.connection);
  }

  async onModuleInit() {
    await this.runMigrations();
  }

  private async runMigrations() {
    this.logger.log('Running migrations...');
    const migrationCollection = this.connection.collection('migrations');

    for (const migration of this.migrations) {
      const migrationName = migration.constructor.name;
      const migrationRecord = await migrationCollection.findOne({ name: migrationName });

      if (!migrationRecord) {
        try {
          await migration.up();
          await migrationCollection.insertOne({ name: migrationName, executedAt: new Date() });
          this.logger.log(`Migration ${migrationName} completed successfully.`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          this.logger.error(`Migration ${migrationName} failed: ${errorMessage}`);
          // Depending on your preference, you might want to break the loop here
          // break;
        }
      } else {
        this.logger.log(`Migration ${migrationName} already executed. Skipping.`);
      }
    }
    this.logger.log('All migrations completed.');
  }

  async seedDatabase() {
    this.logger.log('Seeding database...');
    try {
      const subscriberSeeder = this.seederFactory.createSubscriberSeeder();
      await subscriberSeeder.seed();
      this.logger.log('Database seeding completed.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.stack : 'An unknown error occurred';
      this.logger.error('Database seeding failed:', errorMessage);
    }
  }
}
