import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { SignInResolver } from './signIn/signIn.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from './common/db.service';
import { SubscriberResolver } from './subscribers/subscribers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      secret: process.env['APP_SECRET_KEY'],
      signOptions: { expiresIn: '600m' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
  ],
  controllers: [],
  providers: [DbService,SignInResolver,SubscriberResolver],
  exports: [],
})
export class BeCoreModule {}
