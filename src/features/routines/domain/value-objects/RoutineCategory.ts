export const routineCategories = ['Fuerza', 'Hipertrofia', 'Resistencia', 'Movilidad', 'Otro'] as const;
export type RoutineCategory = (typeof routineCategories)[number];
