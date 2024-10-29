import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; // Use default import
import { BeCoreModule } from '../../be-core.module';
import { LoggingService } from '../../services/logging.service';
import { expect, describe, it, beforeAll, afterAll, jest } from '@jest/globals'; 

// Mock the entire @nestjs/apollo module
jest.mock('@nestjs/apollo', () => ({
  ApolloDriver: jest.fn(),
}));

// Mock the entire @nestjs/graphql module
jest.mock('@nestjs/graphql', () => {
  const originalModule = jest.requireActual('@nestjs/graphql');
  return {
    ...(originalModule as object), // Cast to object to allow spread
    GraphQLModule: {
      forRoot: jest.fn().mockReturnValue({
        module: class MockGraphQLModule {},
      }),
    },
    Query: jest.fn().mockImplementation(() => () => ({})),
    Args: jest.fn().mockImplementation(() => () => ({})),
    Resolver: jest.fn().mockImplementation(() => (target: any) => target),
    Mutation: jest.fn().mockImplementation(() => () => ({})),
  };
});

// Mock the SubscriberResolver
jest.mock('../../subscribers/subscribers.resolver', () => {
  return {
    SubscriberResolver: jest.fn().mockImplementation(() => ({})),
  };
});

describe('Error Handling (e2e)', () => {
  let app: INestApplication;
  let mockLoggingService: jest.Mocked<LoggingService>;

  beforeAll(async () => {
    mockLoggingService = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BeCoreModule],
    })
      .overrideProvider('GraphQLModule')
      .useValue({})
      .overrideProvider(LoggingService)
      .useValue(mockLoggingService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET non-existent-route (404 Not Found)', () => {
    return request(app.getHttpServer())
      .get('/non-existent-route')
      .expect(404)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('statusCode', 404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errorCode');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('path');
      })
      .then(() => {
        expect(mockLoggingService.error).toHaveBeenCalled();
        expect(mockLoggingService.error.mock.calls[0][0]).toContain('Cannot GET /non-existent-route');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
