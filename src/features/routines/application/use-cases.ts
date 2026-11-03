import type { Clock, IdGenerator } from '@/src/shared/application/ports';
import { AppError } from '@/src/shared/domain/AppError';
import type { Routine } from '../domain/entities/Routine';
import type { RoutineInput } from './dtos/RoutineInput';
import { validateRoutine } from '../domain/validation';
import type { RoutineRepository } from './ports';

export class RoutineUseCases {
  constructor(
    private readonly routines: RoutineRepository,
    private readonly ids: IdGenerator,
    private readonly clock: Clock,
  ) {}

  listRoutines(userId: string): Promise<Routine[]> {
    return this.routines.listRoutines(userId);
  }

  async createRoutine(userId: string, input: RoutineInput): Promise<Routine> {
    const details = validateRoutine(input);
    const now = this.clock.now();
    const routine = { id: this.ids.next(), userId, ...details, createdAt: now, updatedAt: now };
    await this.routines.saveRoutine(routine);
    return routine;
  }

  async updateRoutine(userId: string, id: string, input: Partial<RoutineInput>): Promise<Routine> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length === 0) {
      throw new AppError('Envía al menos un campo para actualizar.');
    }
    const current = await this.routines.findRoutine(userId, id);
    if (!current) throw new AppError('No se encontró la rutina.', 404);
    const updated = await this.routines.updateRoutine(userId, id, validateRoutine({ ...current, ...input }), this.clock.now());
    if (!updated) throw new AppError('No se encontró la rutina.', 404);
    return updated;
  }

  async deleteRoutine(userId: string, id: string): Promise<void> {
    if (!(await this.routines.deleteRoutine(userId, id))) throw new AppError('No se encontró la rutina.', 404);
  }
}
