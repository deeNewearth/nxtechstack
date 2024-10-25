import { Connection } from 'mongoose';
import { Subscriber } from '../../subscribers/subscriber.schema';
import { Logger } from '@nestjs/common';

export class SubscriberSeeder {
  private readonly logger = new Logger(SubscriberSeeder.name);

  constructor(private connection: Connection) {}

  async seed(count: number = 10): Promise<void> {
    const subscriberModel = this.connection.model<Subscriber>('Subscriber'); 
    
    for (let i = 0; i < count; i++) {
      const subscriber = {
        details: {
          phoneNumber: `12345678${i.toString().padStart(2, '0')}`,
          firstName: `User${i}`,
          lastName: `Lastname${i}`,
          birthDay: new Date(1990, 0, 1 + i),
        }
      };

      try {
        await subscriberModel.findOneAndUpdate(
          { 'details.phoneNumber': subscriber.details.phoneNumber },
          subscriber,
          { upsert: true, new: true }
        );
        this.logger.log(`Seeded or updated subscriber with phone number: ${subscriber.details.phoneNumber}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.stack : 'An unknown error occurred';
        this.logger.error(`Failed to seed subscriber with phone number: ${subscriber.details.phoneNumber}`, errorMessage);
      }
    }
  }
}
