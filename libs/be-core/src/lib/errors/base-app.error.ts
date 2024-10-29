// base-app.error.ts
import { GraphQLError } from 'graphql';

export class BaseAppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;
  
    constructor(message: string, statusCode: number = 500, errorCode: string = 'E000') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      Error.captureStackTrace(this, this.constructor);
    }
  
    toGraphQLError(): GraphQLError {
      return new GraphQLError(this.message, {
        extensions: {
          code: this.errorCode,
          status: this.statusCode,
        },
      });
    }
  }
  
