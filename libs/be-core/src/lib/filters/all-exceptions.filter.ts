import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseAppError } from '../errors/base-app.error';
import { LoggingService } from '../services/logging.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'E000';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof BaseAppError) {
      status = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      message: message,
      errorCode: errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      `${errorResponse.statusCode} - ${errorResponse.message}`,
      exception instanceof Error ? exception.stack : undefined
    );

    response.status(status).json(errorResponse);
  }
}
