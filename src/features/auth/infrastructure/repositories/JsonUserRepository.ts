import { AppError } from '@/src/shared/domain/AppError';
import { readDatabase, updateDatabase } from '@/src/shared/infrastructure/persistence/JsonDatabase';
import type { UserAccount } from '../../domain/entities/UserAccount';
import type { UserRepository } from '../../application/ports';

export class JsonUserRepository implements UserRepository {
  findUserByEmail(email: string): Promise<UserAccount | null> {
    return readDatabase(({ users }) => users.find((user) => user.email === email) ?? null);
  }

  findUserById(id: string): Promise<UserAccount | null> {
    return readDatabase(({ users }) => users.find((user) => user.id === id) ?? null);
  }

  saveUser(user: UserAccount): Promise<void> {
    return updateDatabase(({ users }) => {
      if (users.some((existing) => existing.email === user.email)) {
        throw new AppError('Ya existe una cuenta con ese correo.', 409);
      }
      users.push(user);
    });
  }
}
