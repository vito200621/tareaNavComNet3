import type { Clock, IdGenerator } from '@/src/shared/application/ports';
import { AppError } from '@/src/shared/domain/AppError';
import type { LoginInput } from './dtos/LoginInput';
import type { RegisterInput } from './dtos/RegisterInput';
import type { User } from '../domain/entities/User';
import type { UserAccount } from '../domain/entities/UserAccount';
import { normalizeEmail, validateName, validatePassword } from '../domain/validation';
import type { PasswordHasher, UserRepository } from './ports';

export class AuthUseCases {
  constructor(
    private readonly users: UserRepository,
    private readonly passwords: PasswordHasher,
    private readonly ids: IdGenerator,
    private readonly clock: Clock,
  ) {}

  async register(input: RegisterInput): Promise<User> {
    if (!input || typeof input !== 'object') throw new AppError('Los datos de registro no son válidos.');
    const name = validateName(input.name);
    const email = normalizeEmail(input.email);
    const password = validatePassword(input.password);
    if (await this.users.findUserByEmail(email)) throw new AppError('Ya existe una cuenta con ese correo.', 409);
    const user: UserAccount = {
      id: this.ids.next(),
      name,
      email,
      passwordHash: await this.passwords.hash(password),
      createdAt: this.clock.now(),
    };
    await this.users.saveUser(user);
    return this.publicUser(user);
  }

  async login(input: LoginInput): Promise<User> {
    if (!input || typeof input !== 'object') throw new AppError('Los datos de inicio de sesión no son válidos.');
    const email = normalizeEmail(input.email);
    const password = validatePassword(input.password);
    const user = await this.users.findUserByEmail(email);
    if (!user || !(await this.passwords.verify(password, user.passwordHash))) {
      throw new AppError('Correo o contraseña incorrectos.', 401);
    }
    return this.publicUser(user);
  }

  async findUser(id: string): Promise<User | null> {
    const user = await this.users.findUserById(id);
    return user ? this.publicUser(user) : null;
  }

  private publicUser(user: UserAccount): User {
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  }
}
