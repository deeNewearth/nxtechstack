import { BaseAppError } from './base-app.error';

export class InternalServerError extends BaseAppError {
  constructor(message: string) {
    super(message, 500, 'E007');
  }
}
