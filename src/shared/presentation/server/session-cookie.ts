import { cookies } from 'next/headers';
import { AppError } from '@/src/shared/domain/AppError';
import type { User } from '@/src/features/auth/domain/entities/User';
import { authUseCases } from '@/src/server/dependencies';
import { createSessionToken, readSessionUserId } from '@/src/features/auth/infrastructure/security/session-token';

const cookieName = 'gym_session';

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = readSessionUserId(cookieStore.get(cookieName)?.value);
  return userId ? authUseCases.findUser(userId) : null;
}

export async function requireSessionUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) throw new AppError('Inicia sesión para continuar.', 401);
  return user;
}

export async function setSession(userId: string): Promise<void> {
  (await cookies()).set(cookieName, createSessionToken(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(cookieName);
}
