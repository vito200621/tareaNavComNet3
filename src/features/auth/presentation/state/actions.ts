'use client';

import type { AppThunk } from '@/src/store/store';
import type { LoginInput } from '../../application/dtos/LoginInput';
import type { RegisterInput } from '../../application/dtos/RegisterInput';
import type { User } from '../../domain/entities/User';
import {
  getCurrentUser,
  loginAccount,
  logoutAccount,
  registerAccount,
} from '../server-actions';
import { authActions } from './reducer';

export const loadCurrentUser = (): AppThunk<Promise<User | null>> => async (dispatch) => {
  dispatch(authActions.loading());
  try {
    const result = await getCurrentUser();
    if (!result.ok || !result.data) {
      dispatch(authActions.unauthenticated());
      return null;
    }
    dispatch(authActions.userReceived(result.data));
    return result.data;
  } catch {
    dispatch(authActions.unauthenticated());
    return null;
  }
};

export const loginUser = (input: LoginInput): AppThunk<Promise<User>> => async (dispatch) => {
  dispatch(authActions.loading());
  try {
    const result = await loginAccount(input);
    if (!result.ok) throw new Error(result.error);
    dispatch(authActions.userReceived(result.data));
    return result.data;
  } catch (error) {
    dispatch(authActions.error(error instanceof Error ? error.message : 'No se pudo iniciar sesión.'));
    throw error;
  }
};

export const registerUser = (input: RegisterInput): AppThunk<Promise<User>> => async (dispatch) => {
  dispatch(authActions.loading());
  try {
    const result = await registerAccount(input);
    if (!result.ok) throw new Error(result.error);
    dispatch(authActions.userReceived(result.data));
    return result.data;
  } catch (error) {
    dispatch(authActions.error(error instanceof Error ? error.message : 'No se pudo crear la cuenta.'));
    throw error;
  }
};

export const logoutUser = (): AppThunk<Promise<void>> => async (dispatch) => {
  const result = await logoutAccount();
  if (!result.ok) throw new Error(result.error);
  dispatch(authActions.unauthenticated());
};
