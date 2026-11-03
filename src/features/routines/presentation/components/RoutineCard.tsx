import type { Routine } from '../../domain/entities/Routine';

interface RoutineCardProps {
  routine: Routine;
  onEdit: () => void;
  onDelete: () => void;
}

export function RoutineCard({ routine, onEdit, onDelete }: RoutineCardProps) {
  return (
    <article className="card min-w-0 bg-base-100 shadow-sm">
      <div className="card-body gap-3 p-5">
        <div className="min-w-0">
          <h2 className="card-title break-words">{routine.name}</h2>
          <p className="mt-1 break-words text-sm text-base-content/70">{routine.description || 'Sin descripción'}</p>
        </div>
        <div className="card-actions items-center justify-between">
          <span className="badge badge-primary badge-outline">{routine.category}</span>
          <div className="flex gap-1">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onEdit}>Editar</button>
            <button type="button" className="btn btn-ghost btn-error btn-sm" onClick={onDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    </article>
  );
}
