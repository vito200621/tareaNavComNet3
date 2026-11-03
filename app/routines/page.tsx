'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Routine } from '@/src/features/routines/domain/entities/Routine';
import type { RoutineInput } from '@/src/features/routines/application/dtos/RoutineInput';
import { routineCategories } from '@/src/features/routines/domain/value-objects/RoutineCategory';
import type { RoutineCategory } from '@/src/features/routines/domain/value-objects/RoutineCategory';
import { useAppDispatch, useAppSelector } from '@/src/store/StoreProvider';
import { loadCurrentUser } from '@/src/features/auth/presentation/state/actions';
import { createRoutine, deleteRoutine, loadRoutines, updateRoutine } from '@/src/features/routines/presentation/state/actions';
import { RoutineCard } from '@/src/features/routines/presentation/components/RoutineCard';

const emptyForm: RoutineInput = { name: '', description: '', category: 'Fuerza' };

export default function RoutinesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const routines = useAppSelector((state) => state.routines);
  const [form, setForm] = useState<RoutineInput>(emptyForm);
  const [editing, setEditing] = useState<Routine | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void dispatch(loadCurrentUser()).then((user) => {
      if (!active) return;
      if (!user) {
        router.push('/login');
        return;
      }
      void dispatch(loadRoutines()).catch(() => undefined);
    });
    return () => { active = false; };
  }, [dispatch, router]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editing) await dispatch(updateRoutine(editing.id, form));
      else await dispatch(createRoutine(form));
      setForm(emptyForm);
      setEditing(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No se pudo guardar la rutina.');
    } finally {
      setSaving(false);
    }
  }

  function beginEdit(routine: Routine) {
    setEditing(routine);
    setForm({ name: routine.name, description: routine.description, category: routine.category });
    setFormError(null);
  }

  async function handleDelete(id: string) {
    try {
      await dispatch(deleteRoutine(id));
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No se pudo eliminar la rutina.');
    }
  }

  if (auth.status !== 'authenticated' || !auth.user) {
    return (
      <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-base-200 p-4">
        <span className="loading loading-spinner loading-lg text-primary" aria-label="Cargando tu cuenta" />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-200 py-6 sm:py-8">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Mis rutinas</h1>
              <p className="mt-1 text-base-content/70">Administra tus planes de entrenamiento.</p>
            </div>
            <span className="badge badge-outline">
              {routines.items.length} {routines.items.length === 1 ? 'rutina' : 'rutinas'}
            </span>
          </div>

          {routines.error && <div role="alert" className="alert alert-error mb-4">{routines.error}</div>}

          {routines.status === 'loading' ? (
            <div className="flex justify-center rounded-box bg-base-100 p-8">
              <span className="loading loading-spinner text-primary" aria-label="Cargando rutinas" />
            </div>
          ) : routines.items.length === 0 ? (
            <div className="card border border-dashed border-base-300 bg-base-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Todavía no tienes rutinas</h2>
                <p className="text-base-content/70">Crea tu primera rutina desde el formulario.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {routines.items.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} onEdit={() => beginEdit(routine)} onDelete={() => void handleDelete(routine.id)} />
              ))}
            </div>
          )}
        </div>

        <aside className="card h-fit bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <h2 className="card-title">{editing ? 'Editar rutina' : 'Nueva rutina'}</h2>
            <form className="space-y-3" noValidate onSubmit={handleSave}>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend"><label htmlFor="routine-name">Nombre</label></legend>
                <input id="routine-name" className="input w-full" value={form.name} required minLength={2} maxLength={80}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Pierna pesada" />
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend"><label htmlFor="routine-description">Descripción</label></legend>
                <textarea id="routine-description" className="textarea w-full" value={form.description} maxLength={500} rows={3}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Ejercicios o notas para esta rutina" />
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend"><label htmlFor="routine-category">Categoría</label></legend>
                <select id="routine-category" className="select w-full" value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value as RoutineCategory })}>
                  {routineCategories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </fieldset>

              {formError && <div role="alert" className="alert alert-error py-3 text-sm">{formError}</div>}

              <div className="card-actions flex-col pt-1 sm:flex-row">
                <button type="submit" className="btn btn-primary w-full sm:flex-1" disabled={saving}>
                  {saving ? <span className="loading loading-spinner loading-sm" aria-hidden="true" /> : null}
                  {saving ? 'Guardando…' : editing ? 'Guardar cambios' : 'Crear rutina'}
                </button>
                {editing && <button type="button" className="btn btn-ghost w-full sm:w-auto"
                  onClick={() => { setEditing(null); setForm(emptyForm); setFormError(null); }}>
                  Cancelar
                </button>}
              </div>
            </form>
          </div>
        </aside>
      </section>
    </main>
  );
}
