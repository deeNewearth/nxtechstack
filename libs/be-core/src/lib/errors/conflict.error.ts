import { BaseAppError } from './base-app.error';

export class ConflictError extends BaseAppError {
  constructor(message: string) {
    super(message, 409, 'E006');
  }
}
