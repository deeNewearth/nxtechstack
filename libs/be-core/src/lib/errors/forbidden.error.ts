import { BaseAppError } from './base-app.error';

export class ForbiddenError extends BaseAppError {
  constructor(message: string) {
    super(message, 403, 'E009');
  }
}