import { unstable_rethrow } from 'next/navigation';
import type { ActionResult } from '@/src/shared/application/ActionResult';
import { AppError } from '@/src/shared/domain/AppError';

export async function safely<Result>(operation: () => Promise<Result>): Promise<ActionResult<Result>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AppError) return { ok: false, error: error.message };
    console.error('Error interno:', error);
    return { ok: false, error: 'Ocurrió un error interno.' };
  }
}
