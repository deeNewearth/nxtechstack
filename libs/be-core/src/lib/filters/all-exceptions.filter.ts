// all-exceptions.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { GqlArgumentsHost } from '@nestjs/graphql';
  import { Request, Response } from 'express';
  import { BaseAppError } from '../errors/base-app.error';
  import { LoggingService } from '../services/logging.service';
  import { GraphQLError } from 'graphql';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggingService) {}
  
    catch(exception: unknown, host: ArgumentsHost) {
      const contextType = host.getType<string>();
  
      if (contextType === 'http') {
        // HTTP context
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
  
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorCode = 'E000';
  
        if (exception instanceof HttpException) {
          statusCode = exception.getStatus();
          message = exception.message;
        } else if (exception instanceof BaseAppError) {
          statusCode = exception.statusCode;
          message = exception.message;
          errorCode = exception.errorCode;
        } else if (exception instanceof Error) {
          message = exception.message;
        }
  
        // Log the error
        this.logger.error(`HTTP Error: ${message}`, exception instanceof Error ? exception.stack : '');
  
        const errorResponse = {
          statusCode,
          message,
          errorCode,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
  
        response.status(statusCode).json(errorResponse);
      } else if (contextType === 'graphql') {
        // GraphQL context
        const gqlHost = GqlArgumentsHost.create(host);
  
        if (exception instanceof BaseAppError) {
          // Convert BaseAppError to GraphQLError
          const graphQLError = exception.toGraphQLError();
  
          // Log the error
          this.logger.error(`GraphQL Error: ${exception.message}`, exception.stack);
  
          // Throw the GraphQLError to be handled by GraphQL
          throw graphQLError;
        } else if (exception instanceof GraphQLError) {
          // Log the GraphQLError
          this.logger.error(`GraphQL Error: ${exception.message}`, exception.stack);
  
          // Re-throw the GraphQLError
          throw exception;
        } else if (exception instanceof Error) {
          // Log the error
          this.logger.error(`GraphQL Error: ${exception.message}`, exception.stack);
  
          // Throw a generic GraphQLError
          throw new GraphQLError(exception.message, {
            extensions: {
              code: 'E000',
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            },
          });
        } else {
          // Log the error
          this.logger.error(`GraphQL Error: ${exception}`);
  
          // Throw a generic GraphQLError
          throw new GraphQLError('Internal server error', {
            extensions: {
              code: 'E000',
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            },
          });
        }
      } else {
        // Fallback for other contexts
        // we can handle WebSocket or RPC contexts here if needed
      }
    }
  }