import { combineReducers, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import type { Reducer, UnknownAction } from 'redux';
import { authActions, authReducer, initialAuthState } from '@/src/features/auth/presentation/state/reducer';
import { initialRoutinesState, routinesReducer } from '@/src/features/routines/presentation/state/reducer';

const combinedReducer = combineReducers({
  auth: authReducer,
  routines: routinesReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer<RootState, UnknownAction> = (state, action) => {
  const nextState = combinedReducer(state, action);
  return authActions.unauthenticated.match(action)
    ? { ...nextState, routines: initialRoutinesState }
    : nextState;
};

export const makeStore = () => configureStore({ reducer: rootReducer });
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<Result = void> = ThunkAction<Result, RootState, unknown, UnknownAction>;

export { initialAuthState, initialRoutinesState };
