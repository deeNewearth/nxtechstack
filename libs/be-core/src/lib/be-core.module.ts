import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/mongoose.module';
import { SubscriberResolver } from './subscribers/subscribers.resolver';
import { SubscribersRepository } from './subscribers/subscribers.repository';
import { MigrationService } from './database/migration.service';
import { configuration } from './config/configuration';
import { SignInResolver } from './signIn/signIn.resolver';
import { DbService } from './common/db.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './modules/logger.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET_KEY'),
        signOptions: { expiresIn: '600m' },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./libs/be-core/src/lib/graphql/schema.graphql'],
      context: ({ req }: { req: any }) => ({ req }),
    }),
    DatabaseModule,
    LoggerModule,
  ],
  providers: [
    SubscriberResolver,
    SubscribersRepository,
    MigrationService,
    SignInResolver,
    DbService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [MigrationService, DbService],
})
export class BeCoreModule {}
