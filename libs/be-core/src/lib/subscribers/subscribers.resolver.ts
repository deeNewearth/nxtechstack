import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { SubscribersRepository } from './subscribers.repository';
import {
  Subscriber as GraphQLSubscriber,
  SubscriberDetailsInput,
} from '../graphql/generated/graphql';
import { Subscriber as MongooseSubscriber } from './subscriber.schema';

@Resolver('Subscriber')
export class SubscriberResolver {
  constructor(private subscribersRepository: SubscribersRepository) {}

  @Query('getSubscribers')
  async getSubscribers(
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber?: string,
    @Args('name', { type: () => String, nullable: true }) name?: string
  ): Promise<GraphQLSubscriber[]> {
    const subscribers = await this.subscribersRepository.findAll(phoneNumber, name);
    return this.mapToGraphQLSubscribers(subscribers);
  }

  @Mutation('updateSubscriberDetails')
  async updateSubscriberDetails(
    @Args('details') details: SubscriberDetailsInput
  ): Promise<GraphQLSubscriber> {
    const subscriber = await this.subscribersRepository.updateDetails(details);
    return this.mapToGraphQLSubscriber(subscriber);
  }

  private mapToGraphQLSubscribers(subscribers: MongooseSubscriber[]): GraphQLSubscriber[] {
    return subscribers.map(this.mapToGraphQLSubscriber);
  }

  private mapToGraphQLSubscriber(subscriber: MongooseSubscriber): GraphQLSubscriber {
    return {
      details: {
        phoneNumber: subscriber.details.phoneNumber || '',
        firstName: subscriber.details.firstName || null,
        lastName: subscriber.details.lastName || null,
        birthDay: subscriber.details.birthDay?.toISOString() || null,
      },
    };
  }
}
