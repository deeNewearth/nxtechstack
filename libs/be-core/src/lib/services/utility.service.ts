import { Injectable } from '@nestjs/common';
import { isValidPhoneNumber, isValidEmail } from '../utils/validation.util';

@Injectable()
export class UtilityService {
  isValidPhoneNumber(phoneNumber: string): boolean {
    return isValidPhoneNumber(phoneNumber);
  }

  isValidEmail(email: string): boolean {
    return isValidEmail(email);
  }
} 