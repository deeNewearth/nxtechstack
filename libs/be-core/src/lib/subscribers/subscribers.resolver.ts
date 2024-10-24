import {
  Args,
  Context,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DbService } from '../common/db.service';
import {
  SubscriberDetails,
  SubscriberDetailsInput,
  SubscriberDto,
} from './subscribers.dto';

type SubscriberDb = {
  details: SubscriberDetails;
};

@Resolver(() => SubscriberDto)
export class SubscriberResolver {
  constructor(private dbService: DbService) {}

  private readonly subscribersCollection =
    this.dbService.db.collection<SubscriberDb>('subscribers');

  onModuleInit() {
    console.log(`SubscriberResolver :OnInit`);

    (async () => {
      try {
        await this.subscribersCollection.createIndex(
          { 'details.phoneNumber': 1 },
          { unique: true }
        );
      } catch (error) {
        console.error('SubscriberResolver: failed creating indexes', error);
      }
    })();
  }

  async findSubscriberByPhoneNumber(
    phoneNumber: string
  ): Promise<SubscriberDto | undefined> {
    const { details } =
      (await this.subscribersCollection.findOne({
        'details.phoneNumber': phoneNumber,
      })) || {};

    if (!details) return undefined;

    return {
      details,
    };
  }

  @Query(() => [SubscriberDto])
  async getSubscribers(
    @Args('phoneNumber', { type: () => String, nullable: true })
    phoneNumber: string | null,
    @Args('name', { type: () => String, nullable: true }) name: string | null
  ): Promise<SubscriberDto[]> {
    if (phoneNumber) {
      const found = await this.findSubscriberByPhoneNumber(phoneNumber);

      return found ? [found] : [];
    }

    throw new Error('not implemented');
  }

  
  @Mutation(() => SubscriberDto)
  async updateSubscriberDetails(
    @Args('details') details: SubscriberDetailsInput
  ) {
    if (!details.phoneNumber) {
      throw new Error('phone number is required');
    }

    if (!details.phoneNumber.match(/^\d{10}$/)) {
      throw new Error('phone number should be 10 digits');
    }

    const done = await this.subscribersCollection.updateOne(
      { 'details.phoneNumber': details.phoneNumber },
      { $set: { details } },
      {
        upsert: true,
      }
    );

    if (done.upsertedCount) {
      console.debug(
        'SubscriberResolver Added new subscriber ',
        done.upsertedCount
      );
    }

    return await this.findSubscriberByPhoneNumber(details.phoneNumber);
  }
    
}
