import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class CryptoUtil {
  private className = CryptoUtil.name;

  constructor(private loggerService: LoggerService) {}

  getRandomToken(): string {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'getRandomToken',
      });
      const token = crypto.randomBytes(3).toString('hex');
      return token;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'getRandomToken',
        payload: e,
      });
      throw e;
    }
  }

  getRandomPin(numDigits = 6): string {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'getRandomPin',
      });
      if (numDigits <= 0 || numDigits > 16) {
        throw new Error(
          'Invalid number of digits. The value must be between 1 and 16.',
        );
      }
      const numBytes = Math.ceil(numDigits / 2);
      const buffer = crypto.randomBytes(numBytes);
      const hexadecimalNumber = buffer.toString('hex');
      const decimalNumber =
        parseInt(hexadecimalNumber, 16) % Math.pow(10, numDigits);
      const pin = decimalNumber.toString().padStart(numDigits, '0');

      return pin;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'getRandomPin',
        payload: e,
      });
      throw e;
    }
  }
}
