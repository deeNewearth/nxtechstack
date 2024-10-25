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
    let query: any = {};
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
    const subscriber = await this.subscriberModel.findOneAndUpdate(
      { 'details.phoneNumber': details.phoneNumber },
      { $set: { details: { ...details, birthDay: details.birthDay ? new Date(details.birthDay) : undefined } } },
      { new: true, upsert: true }
    ).exec();
    return subscriber!;
  }
}
