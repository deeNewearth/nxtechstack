import { BaseAppError } from './base-app.error';

export class DatabaseError extends BaseAppError {
  constructor(message: string) {
    super(message, 500, 'E002');
  }
}
