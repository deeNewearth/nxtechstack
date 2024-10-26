import { BaseAppError } from './base-app.error';

export class AuthorizationError extends BaseAppError {
  constructor(message: string) {
    super(message, 403, 'E004');
  }
}
