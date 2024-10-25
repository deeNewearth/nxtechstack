import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './subscriber.schema';
import { SubscriberDetailsInput } from '../graphql/generated/graphql';

@Injectable()
export class SubscribersRepository {
  constructor(@InjectModel(Subscriber.name) private subscriberModel: Model<SubscriberDocument>) {}

  async findByPhoneNumber(phoneNumber: string): Promise<Subscriber | null> {
    return this.subscriberModel.findOne({ 'details.phoneNumber': phoneNumber }).exec();
  }

  async findAll(phoneNumber?: string, name?: string): Promise<Subscriber[]> {
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
    return this.subscriberModel.find(query).exec();
  }

  async updateDetails(details: SubscriberDetailsInput): Promise<Subscriber> {
    const updateFields = Object.entries(details).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (key === 'birthDay') {
          // Only update birthDay if it's a non-empty string
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
      throw new Error('Failed to update or create subscriber');
    }

    return subscriber;
  }
}
