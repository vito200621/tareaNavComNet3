import { readDatabase, updateDatabase } from '@/src/shared/infrastructure/persistence/JsonDatabase';
import type { Routine } from '../../domain/entities/Routine';
import type { RoutineDetails } from '../../domain/value-objects/RoutineDetails';
import type { RoutineRepository } from '../../application/ports';

export class JsonRoutineRepository implements RoutineRepository {
  listRoutines(userId: string): Promise<Routine[]> {
    return readDatabase(({ routines }) => routines.filter((routine) => routine.userId === userId));
  }

  findRoutine(userId: string, id: string): Promise<Routine | null> {
    return readDatabase(({ routines }) => routines.find((routine) => routine.userId === userId && routine.id === id) ?? null);
  }

  saveRoutine(routine: Routine): Promise<void> {
    return updateDatabase(({ routines }) => {
      routines.push(routine);
    });
  }

  updateRoutine(userId: string, id: string, details: RoutineDetails, updatedAt: string): Promise<Routine | null> {
    return updateDatabase(({ routines }) => {
      const routine = routines.find((item) => item.userId === userId && item.id === id);
      if (!routine) return null;
      Object.assign(routine, details, { updatedAt });
      return routine;
    });
  }

  deleteRoutine(userId: string, id: string): Promise<boolean> {
    return updateDatabase(({ routines }) => {
      const index = routines.findIndex((item) => item.userId === userId && item.id === id);
      if (index < 0) return false;
      routines.splice(index, 1);
      return true;
    });
  }
}
