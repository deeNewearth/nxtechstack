import { BaseAppError } from './base-app.error';

export class AuthenticationError extends BaseAppError {
  constructor(message: string) {
    super(message, 401, 'E003');
  }
}
