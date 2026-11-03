import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { PasswordHasher } from '../../application/ports';

const scrypt = promisify(scryptCallback);

export class ScryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    return salt + ':' + hash.toString('hex');
  }

  async verify(password: string, stored: string): Promise<boolean> {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash || !/^[a-f\d]{128}$/i.test(hash)) return false;
    const expected = Buffer.from(hash, 'hex');
    const actual = (await scrypt(password, salt, 64)) as Buffer;
    return timingSafeEqual(expected, actual);
  }
}
