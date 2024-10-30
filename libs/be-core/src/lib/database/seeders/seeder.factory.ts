import { Connection } from 'mongoose';
import { SubscriberSeeder } from './subscriber.seeder';

export class SeederFactory {
  constructor(private connection: Connection) {}

  createSubscriberSeeder(): SubscriberSeeder {
    return new SubscriberSeeder(this.connection);
  }

  // Add more seeder methods as needed
}
