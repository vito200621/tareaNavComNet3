import { AppError } from '@/src/shared/domain/AppError';

export function normalizeEmail(value: unknown): string {
  if (typeof value !== 'string') throw new AppError('Ingresa un correo válido.');
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError('Ingresa un correo válido.');
  }
  return email;
}

export function validateName(value: unknown): string {
  if (typeof value !== 'string') throw new AppError('El nombre es obligatorio.');
  const name = value.trim();
  if (name.length < 2 || name.length > 80) {
    throw new AppError('El nombre debe tener entre 2 y 80 caracteres.');
  }
  return name;
}

export function validatePassword(value: unknown): string {
  if (typeof value !== 'string' || value.length < 8 || value.length > 128) {
    throw new AppError('La contraseña debe tener entre 8 y 128 caracteres.');
  }
  return value;
}
