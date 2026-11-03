import type { RoutineDetails } from '../value-objects/RoutineDetails';

export interface Routine extends RoutineDetails {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
