import { BaseAppError } from './base-app.error';

export class InvalidEmailError extends BaseAppError {
  constructor(message: string = 'Invalid email format') {
    super(message, 400, 'E008');
  }
} 