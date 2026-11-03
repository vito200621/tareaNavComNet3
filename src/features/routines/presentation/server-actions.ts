'use server';

import type { ActionResult } from '@/src/shared/application/ActionResult';
import { routineUseCases } from '@/src/server/dependencies';
import type { Routine } from '../domain/entities/Routine';
import type { RoutineInput } from '../application/dtos/RoutineInput';
import { requireSessionUser } from '@/src/shared/presentation/server/session-cookie';
import { safely } from '@/src/shared/presentation/server/safely';

export async function getRoutines(): Promise<ActionResult<Routine[]>> {
  return safely(async () => routineUseCases.listRoutines((await requireSessionUser()).id));
}

export async function createRoutine(input: RoutineInput): Promise<ActionResult<Routine>> {
  return safely(async () => routineUseCases.createRoutine((await requireSessionUser()).id, input));
}

export async function updateRoutine(id: string, input: Partial<RoutineInput>): Promise<ActionResult<Routine>> {
  return safely(async () => routineUseCases.updateRoutine((await requireSessionUser()).id, id, input));
}

export async function deleteRoutine(id: string): Promise<ActionResult<null>> {
  return safely(async () => {
    await routineUseCases.deleteRoutine((await requireSessionUser()).id, id);
    return null;
  });
}
