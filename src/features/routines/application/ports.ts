import type { Routine } from '../domain/entities/Routine';
import type { RoutineDetails } from '../domain/value-objects/RoutineDetails';

export interface RoutineRepository {
  listRoutines(userId: string): Promise<Routine[]>;
  findRoutine(userId: string, id: string): Promise<Routine | null>;
  saveRoutine(routine: Routine): Promise<void>;
  updateRoutine(userId: string, id: string, details: RoutineDetails, updatedAt: string): Promise<Routine | null>;
  deleteRoutine(userId: string, id: string): Promise<boolean>;
}
