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
import { LoggingService } from '../services/logging.service';
import { UseGuards } from '@nestjs/common';
import { RolesPermissionsGuard } from '../rbac/roles-permissions.guard';
import { Roles } from '../rbac/roles.decorator';
import { Permissions } from '../rbac/permissions.decorator';
import { Role } from '../rbac/roles.enum';
import { Permission } from '../rbac/permissions.enum';

@Resolver('Subscriber')
@UseGuards(RolesPermissionsGuard)
export class SubscriberResolver {
  constructor(
    private subscribersRepository: SubscribersRepository,
    private logger: LoggingService
  ) {}

  @Query('getSubscribers')
  @Roles(Role.Admin, Role.User)
  @Permissions(Permission.Read)  
  async getSubscribers(
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber?: string,
    @Args('name', { type: () => String, nullable: true }) name?: string
  ): Promise<GraphQLSubscriber[]> {
    this.logger.info('Fetching subscribers');
    try {
      const subscribers = await this.subscribersRepository.findAll(phoneNumber, name);
      this.logger.info('Successfully fetched subscribers');
      return this.mapToGraphQLSubscribers(subscribers);
    } catch (error) {
      // this.logger.error('Error fetching subscribers', error instanceof Error ? error.stack : '');
      throw error; // Allow the error to propagate to the global exception filter
    }
  }

  @Mutation('updateSubscriberDetails')
  @Roles(Role.Admin)
  @Permissions(Permission.Write)  
  async updateSubscriberDetails(
    @Args('details') details: SubscriberDetailsInput
  ): Promise<GraphQLSubscriber> {
    this.logger.info('Updating subscriber details');
    try {
      const subscriber = await this.subscribersRepository.updateDetails(details);
      this.logger.info('Successfully updated subscriber details');
      return this.mapToGraphQLSubscriber(subscriber);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error updating subscriber details', error.stack);
      }
      throw error;
    }
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
