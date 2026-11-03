import type { RoutineCategory } from '../../domain/value-objects/RoutineCategory';

export interface RoutineInput {
  name: string;
  description: string;
  category: RoutineCategory;
}
