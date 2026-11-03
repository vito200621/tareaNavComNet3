import type { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export function TextField({ id, label, error, className = '', ...inputProps }: TextFieldProps) {
  const errorId = id + '-error';

  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        <label htmlFor={id}>{label}</label>
      </legend>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={('input w-full ' + (error ? 'input-error ' : '') + className).trim()}
        {...inputProps}
      />
      {error && <p id={errorId} className="fieldset-label text-error">{error}</p>}
    </fieldset>
  );
}
