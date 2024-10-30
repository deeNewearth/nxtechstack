import { BaseMigration } from './base.migration';

export class CreateSubscriberIndex extends BaseMigration {
  async up(): Promise<void> {
    const subscriberCollection = this.connection.collection('subscribers');
    await subscriberCollection.createIndex({ 'details.phoneNumber': 1 }, { unique: true });
  }

  async down(): Promise<void> {
    const subscriberCollection = this.connection.collection('subscribers');
    await subscriberCollection.dropIndex('details.phoneNumber_1');
  }
}
