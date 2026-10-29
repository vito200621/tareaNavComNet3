// app/login/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && !email.trim();
  const passwordError = submitted && !password.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (email.trim() && password.trim()) {
      router.replace('/routines');
    }
  };

  return (
    <main className="bg-base-200 flex min-h-screen items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <form onSubmit={handleSubmit} noValidate className="card-body gap-4">
          <div>
            <h1 className="card-title text-2xl">Iniciar sesión</h1>
            <p className="text-base-content/70">Entra para ver tus rutinas.</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">Correo</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input input-bordered w-full ${emailError ? 'input-error' : ''}`}
            />
            {emailError && <p role="alert" className="text-error text-sm">Escribe tu correo.</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input input-bordered w-full ${passwordError ? 'input-error' : ''}`}
            />
            {passwordError && <p role="alert" className="text-error text-sm">Escribe tu contraseña.</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">Iniciar sesión</button>

          <p className="text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="link link-primary">Regístrate</Link>
          </p>
        </form>
      </div>
    </main>
  );
}