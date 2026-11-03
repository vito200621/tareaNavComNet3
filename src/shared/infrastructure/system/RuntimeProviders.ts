import { randomUUID } from 'node:crypto';
import type { Clock, IdGenerator } from '@/src/shared/application/ports';

export class UuidGenerator implements IdGenerator {
  next(): string {
    return randomUUID();
  }
}

export class SystemClock implements Clock {
  now(): string {
    return new Date().toISOString();
  }
}
