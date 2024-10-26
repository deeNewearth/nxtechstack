import { BaseAppError } from '../../errors/base-app.error';
import { expect, describe, it } from '@jest/globals';

describe('BaseAppError', () => {
  it('should create an instance with the correct properties', () => {
    const error = new BaseAppError('Test error', 400, 'E001');
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(BaseAppError);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.errorCode).toBe('E001');
    expect(error.name).toBe('BaseAppError');
  });
});
