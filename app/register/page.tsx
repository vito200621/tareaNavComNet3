'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { registerUser } from '@/src/features/auth/presentation/state/actions';
import { TextField } from '@/src/shared/presentation/components/TextField';
import { useAppDispatch, useAppSelector } from '@/src/store/StoreProvider';

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmation: false });
  const show = (field: keyof typeof touched) => submitted || touched[field];
  const nameError = show('name') && (name.trim().length < 2 ? 'Escribe al menos 2 caracteres.' : undefined);
  const emailError = show('email') && (!email.trim() ? 'Ingresa tu correo.' : !validEmail(email) ? 'Ingresa un correo válido.' : undefined);
  const passwordError = show('password') && (password.length < 8 ? 'Usa al menos 8 caracteres.' : undefined);
  const confirmationError = show('confirmation')
    && (!confirmation ? 'Confirma tu contraseña.' : confirmation !== password ? 'Las contraseñas no coinciden.' : undefined);
  const isLoading = status === 'loading';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (name.trim().length < 2 || !validEmail(email) || password.length < 8 || !confirmation || confirmation !== password) return;

    try {
      await dispatch(registerUser({ name, email, password }));
      router.push('/routines');
    } catch {
      return;
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-base-200 p-4">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-4 p-6 sm:p-8">
          <div className="space-y-1 text-center">
            <h1 className="card-title justify-center text-3xl">Crea tu cuenta</h1>
            <p className="text-base-content/70">Regístrate para organizar tus entrenamientos</p>
          </div>

          <form className="space-y-2" noValidate onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Nombre"
              type="text"
              autoComplete="name"
              placeholder="Ana Pérez"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, name: true }))}
              required
              minLength={2}
              maxLength={80}
              error={nameError || undefined}
            />
            <TextField
              id="email"
              label="Correo"
              type="email"
              autoComplete="email"
              placeholder="ana@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              required
              maxLength={254}
              error={emailError || undefined}
            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, password: true }))}
              required
              minLength={8}
              maxLength={128}
              error={passwordError || undefined}
            />
            <TextField
              id="confirmation"
              label="Confirmar contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, confirmation: true }))}
              required
              minLength={8}
              maxLength={128}
              error={confirmationError || undefined}
            />

            {error && <div role="alert" className="alert alert-error py-3 text-sm">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block mt-2" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner loading-sm" aria-hidden="true" /> : null}
              {isLoading ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="link link-primary font-medium">Inicia sesión</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
