import { createHmac, timingSafeEqual } from 'node:crypto';

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET debe configurarse en producción.');
  return 'local-development-session-secret-change-before-deploying';
}

export function assertSessionConfigured(): void {
  sessionSecret();
}

export function createSessionToken(userId: string): string {
  const payload = Buffer.from(JSON.stringify({ userId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
  return payload + '.' + signature;
}

export function readSessionUserId(token?: string): string | null {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = createHmac('sha256', sessionSecret()).update(payload).digest();
  const actual = Buffer.from(signature, 'base64url');
  if (actual.length !== expected.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { userId?: unknown; expiresAt?: unknown };
    return typeof session.userId === 'string' && typeof session.expiresAt === 'number' && session.expiresAt > Date.now()
      ? session.userId
      : null;
  } catch {
    return null;
  }
}
