import { BaseAppError } from './base-app.error';

export class ValidationError extends BaseAppError {
  constructor(message: string) {
    super(message, 400, 'E001');
  }
}
