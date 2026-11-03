import { AppError } from '@/src/shared/domain/AppError';
import { routineCategories, type RoutineCategory } from './value-objects/RoutineCategory';
import type { RoutineDetails } from './value-objects/RoutineDetails';

export function validateRoutine(value: unknown): RoutineDetails {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new AppError('Los datos de la rutina no son válidos.');
  }
  const input = value as Record<string, unknown>;
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const description = typeof input.description === 'string' ? input.description.trim() : '';
  const category = input.category;
  if (name.length < 2 || name.length > 80) {
    throw new AppError('El nombre debe tener entre 2 y 80 caracteres.');
  }
  if (description.length > 500) throw new AppError('La descripción no puede superar 500 caracteres.');
  if (typeof category !== 'string' || !routineCategories.includes(category as RoutineCategory)) {
    throw new AppError('Selecciona una categoría válida.');
  }
  return { name, description, category: category as RoutineCategory };
}
