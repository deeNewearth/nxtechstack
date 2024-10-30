import { BaseAppError } from './base-app.error';

export class NotFoundError extends BaseAppError {
  constructor(message: string) {
    super(message, 404, 'E005');
  }
}
