'use client';

import type { AppThunk } from '@/src/store/store';
import type { Routine } from '../../domain/entities/Routine';
import type { RoutineInput } from '../../application/dtos/RoutineInput';
import {
  createRoutine as createRoutineAction,
  deleteRoutine as deleteRoutineAction,
  getRoutines,
  updateRoutine as updateRoutineAction,
} from '../server-actions';
import { routinesActions } from './reducer';

export const loadRoutines = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(routinesActions.loading());
  try {
    const result = await getRoutines();
    if (!result.ok) throw new Error(result.error);
    dispatch(routinesActions.received(result.data));
  } catch (error) {
    dispatch(routinesActions.error(error instanceof Error ? error.message : 'No se pudieron cargar las rutinas.'));
    throw error;
  }
};

export const createRoutine = (input: RoutineInput): AppThunk<Promise<Routine>> => async (dispatch) => {
  const result = await createRoutineAction(input);
  if (!result.ok) throw new Error(result.error);
  dispatch(routinesActions.upserted(result.data));
  return result.data;
};

export const updateRoutine = (id: string, input: Partial<RoutineInput>): AppThunk<Promise<Routine>> => async (dispatch) => {
  const result = await updateRoutineAction(id, input);
  if (!result.ok) throw new Error(result.error);
  dispatch(routinesActions.upserted(result.data));
  return result.data;
};

export const deleteRoutine = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
  const result = await deleteRoutineAction(id);
  if (!result.ok) throw new Error(result.error);
  dispatch(routinesActions.removed(id));
};
