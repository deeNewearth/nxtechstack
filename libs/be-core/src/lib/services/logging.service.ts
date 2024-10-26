import { Injectable } from '@nestjs/common';
import { ILogger } from '../interfaces/logger.interface';

@Injectable()
export class LoggingService implements ILogger {
  error(message: string, trace?: string): void {
    console.error(`Error: ${message}`, trace);
  }

  warn(message: string): void {
    console.warn(`Warning: ${message}`);
  }

  info(message: string): void {
    console.info(`Info: ${message}`);
  }

  debug(message: string): void {
    console.debug(`Debug: ${message}`);
  }
}
