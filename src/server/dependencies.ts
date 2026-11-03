import { AuthUseCases } from '@/src/features/auth/application/use-cases';
import { JsonUserRepository } from '@/src/features/auth/infrastructure/repositories/JsonUserRepository';
import { ScryptPasswordHasher } from '@/src/features/auth/infrastructure/security/ScryptPasswordHasher';
import { RoutineUseCases } from '@/src/features/routines/application/use-cases';
import { JsonRoutineRepository } from '@/src/features/routines/infrastructure/repositories/JsonRoutineRepository';
import { SystemClock, UuidGenerator } from '@/src/shared/infrastructure/system/RuntimeProviders';

const clock = new SystemClock();
const ids = new UuidGenerator();
const users = new JsonUserRepository();
const routines = new JsonRoutineRepository();

export const authUseCases = new AuthUseCases(users, new ScryptPasswordHasher(), ids, clock);
export const routineUseCases = new RoutineUseCases(routines, ids, clock);
