import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { UserAccount } from '@/src/features/auth/domain/entities/UserAccount';
import type { Routine } from '@/src/features/routines/domain/entities/Routine';

export interface DatabaseState {
  users: UserAccount[];
  routines: Routine[];
}

const databasePath = path.join(process.cwd(), '.data', 'database.json');
let queue: Promise<unknown> = Promise.resolve();

function serialize<Result>(operation: () => Promise<Result>): Promise<Result> {
  const result = queue.then(operation);
  queue = result.then(() => undefined, () => undefined);
  return result;
}

async function loadDatabase(): Promise<DatabaseState> {
  try {
    const content = await readFile(databasePath, 'utf8');
    const data = JSON.parse(content) as Partial<DatabaseState>;
    return {
      users: Array.isArray(data.users) ? data.users : [],
      routines: Array.isArray(data.routines) ? data.routines : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { users: [], routines: [] };
    throw error;
  }
}

async function persistDatabase(database: DatabaseState): Promise<void> {
  await mkdir(path.dirname(databasePath), { recursive: true });
  const temporaryPath = databasePath + '.tmp';
  await writeFile(temporaryPath, JSON.stringify(database, null, 2), 'utf8');
  await rename(temporaryPath, databasePath);
}

export function readDatabase<Result>(reader: (database: DatabaseState) => Result): Promise<Result> {
  return serialize(async () => reader(await loadDatabase()));
}

export function updateDatabase<Result>(updater: (database: DatabaseState) => Result): Promise<Result> {
  return serialize(async () => {
    const database = await loadDatabase();
    const result = updater(database);
    await persistDatabase(database);
    return result;
  });
}
