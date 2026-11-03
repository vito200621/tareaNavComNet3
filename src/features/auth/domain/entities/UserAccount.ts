import type { User } from './User';

export interface UserAccount extends User {
  passwordHash: string;
}
