import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Subscriber, SubscriberSchema } from '../subscribers/subscriber.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_CONNECTION') || 'mongodb://localhost:27017/nxtechstack';
        return {
          uri,
          directConnection: true,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Subscriber.name, schema: SubscriberSchema }])
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
