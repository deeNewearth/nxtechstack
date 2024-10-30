import { Test, TestingModule } from '@nestjs/testing';
import { AllExceptionsFilter } from '../../filters/all-exceptions.filter';
import { LoggingService } from '../../services/logging.service';
import { ValidationError } from '../../errors/validation.error';
import { ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { expect, describe, it, beforeEach, jest } from '@jest/globals';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let loggingService: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: LoggingService,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
    loggingService = module.get<LoggingService>(LoggingService);
  });

  it('should handle BaseAppError correctly', () => {
    const error = new ValidationError('Test validation error');
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockHttpArgumentsHost: HttpArgumentsHost = {
      getRequest: jest.fn().mockReturnValue({ url: '/test' }) as any,
      getResponse: jest.fn().mockReturnValue({ status: mockStatus }) as any,
      getNext: jest.fn() as any,
    };

    const mockArgumentsHost: ArgumentsHost = {
      switchToHttp: () => mockHttpArgumentsHost,
      getArgByIndex: <T = any>(index: number): T => ({} as T),
      getArgs: <T extends Array<any> = any[]>(): T => [] as unknown as T,
      getType: <TContext extends string = string>(): TContext => 'http' as TContext,
      switchToRpc: jest.fn() as any,
      switchToWs: jest.fn() as any,
    };

    filter.catch(error, mockArgumentsHost);

    expect(loggingService.error).toHaveBeenCalled();
    expect((mockHttpArgumentsHost.getResponse() as any).status).toHaveBeenCalledWith(400);
    expect((mockHttpArgumentsHost.getResponse() as any).status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: 'Test validation error',
        errorCode: 'E001',
        path: '/test',
      })
    );
  });
});
