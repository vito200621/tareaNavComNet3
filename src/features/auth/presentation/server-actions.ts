'use server';

import type { ActionResult } from '@/src/shared/application/ActionResult';
import { authUseCases } from '@/src/server/dependencies';
import { clearSession, getSessionUser, setSession } from '@/src/shared/presentation/server/session-cookie';
import { safely } from '@/src/shared/presentation/server/safely';
import type { LoginInput } from '../application/dtos/LoginInput';
import type { RegisterInput } from '../application/dtos/RegisterInput';
import type { User } from '../domain/entities/User';
import { assertSessionConfigured } from '../infrastructure/security/session-token';

export async function getCurrentUser(): Promise<ActionResult<User | null>> {
  return safely(getSessionUser);
}

export async function registerAccount(input: RegisterInput): Promise<ActionResult<User>> {
  return safely(async () => {
    assertSessionConfigured();
    const user = await authUseCases.register(input);
    await setSession(user.id);
    return user;
  });
}

export async function loginAccount(input: LoginInput): Promise<ActionResult<User>> {
  return safely(async () => {
    assertSessionConfigured();
    const user = await authUseCases.login(input);
    await setSession(user.id);
    return user;
  });
}

export async function logoutAccount(): Promise<ActionResult<null>> {
  return safely(async () => {
    await clearSession();
    return null;
  });
}
