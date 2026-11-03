'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { loginUser } from '@/src/features/auth/presentation/state/actions';
import { TextField } from '@/src/shared/presentation/components/TextField';
import { useAppDispatch, useAppSelector } from '@/src/store/StoreProvider';

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailError = (submitted || touched.email)
    ? !email.trim() ? 'Ingresa tu correo.' : !validEmail(email) ? 'Ingresa un correo válido.' : undefined
    : undefined;
  const passwordError = (submitted || touched.password)
    ? password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : undefined
    : undefined;
  const isLoading = status === 'loading';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!validEmail(email) || password.length < 8) return;

    try {
      await dispatch(loginUser({ email, password }));
      router.replace('/routines');
    } catch {
      return;
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-base-200 p-4">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="space-y-1 text-center">
            <h1 className="card-title justify-center text-3xl">Bienvenido</h1>
            <p className="text-base-content/70">Inicia sesión para ver tus rutinas</p>
          </div>

          <form className="space-y-3" noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Correo"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              required
              maxLength={254}
              error={emailError}
            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, password: true }))}
              required
              minLength={8}
              maxLength={128}
              error={passwordError}
            />

            {error && <div role="alert" className="alert alert-error py-3 text-sm">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner loading-sm" aria-hidden="true" /> : null}
              {isLoading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="link link-primary font-medium">Regístrate</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
