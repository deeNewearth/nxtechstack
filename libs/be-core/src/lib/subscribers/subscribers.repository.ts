import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './subscriber.schema';
import { SubscriberDetailsInput } from '../graphql/generated/graphql';
import { ValidationError } from '../errors/validation.error';
import { LoggingService } from '../services/logging.service';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class SubscribersRepository {
  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<SubscriberDocument>,
    private logger: LoggingService,
    private utilityService: UtilityService
  ) {}

  async findAll(phoneNumber?: string, name?: string): Promise<Subscriber[]> {
    this.logger.info('Finding all subscribers');
    if (phoneNumber && !this.utilityService.isValidPhoneNumber(phoneNumber)) {
      throw new ValidationError('Invalid phone number format');
    }
    const query: Record<string, any> = {};
    if (phoneNumber) {
      query['details.phoneNumber'] = phoneNumber;
    }
    if (name) {
      query['$or'] = [
        { 'details.firstName': new RegExp(name, 'i') },
        { 'details.lastName': new RegExp(name, 'i') }
      ];
    }
    const subscribers = await this.subscriberModel.find(query).exec();
    this.logger.info('Successfully found subscribers');
    return subscribers;
  }

  async updateDetails(details: SubscriberDetailsInput): Promise<Subscriber> {
    this.logger.info('Updating subscriber details');
    if (details.phoneNumber && !this.utilityService.isValidPhoneNumber(details.phoneNumber)) {
      this.logger.warn('Invalid phone number format');
      throw new ValidationError('Invalid phone number format');
    }
    const updateFields = Object.entries(details).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (key === 'birthDay') {
          if (typeof value === 'string' && value.trim() !== '') {
            acc[`details.${key}`] = new Date(value);
          }
        } else {
          acc[`details.${key}`] = value;
        }
      }
      return acc;
    }, {} as Record<string, any>);

    const subscriber = await this.subscriberModel.findOneAndUpdate(
      { 'details.phoneNumber': details.phoneNumber },
      { $set: updateFields },
      { new: true, upsert: true }
    ).exec();

    if (!subscriber) {
      this.logger.error('Failed to update or create subscriber');
      throw new Error('Failed to update or create subscriber');
    }

    this.logger.info('Successfully updated subscriber details');
    return subscriber;
  }
}
