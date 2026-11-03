import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../domain/entities/User';

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loading(state) {
      state.status = 'loading';
      state.error = null;
    },
    userReceived(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = 'authenticated';
      state.error = null;
    },
    unauthenticated() {
      return { user: null, status: 'unauthenticated', error: null } satisfies AuthState;
    },
    error(state, action: PayloadAction<string>) {
      state.status = 'unauthenticated';
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
