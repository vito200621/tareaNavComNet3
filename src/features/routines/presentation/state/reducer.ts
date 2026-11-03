import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Routine } from '../../domain/entities/Routine';

export interface RoutinesState {
  items: Routine[];
  status: 'idle' | 'loading';
  error: string | null;
}

export const initialRoutinesState: RoutinesState = {
  items: [],
  status: 'idle',
  error: null,
};

const routinesSlice = createSlice({
  name: 'routines',
  initialState: initialRoutinesState,
  reducers: {
    loading(state) {
      state.status = 'loading';
      state.error = null;
    },
    received(_state, action: PayloadAction<Routine[]>) {
      return { items: action.payload, status: 'idle', error: null } satisfies RoutinesState;
    },
    upserted(state, action: PayloadAction<Routine>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.map((item) => item.id === action.payload.id ? action.payload : item);
      } else {
        state.items.unshift(action.payload);
      }
    },
    removed(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    error(state, action: PayloadAction<string>) {
      state.status = 'idle';
      state.error = action.payload;
    },
  },
});

export const routinesActions = routinesSlice.actions;
export const routinesReducer = routinesSlice.reducer;
