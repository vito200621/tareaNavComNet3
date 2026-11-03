'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { makeStore } from './store';
import type { AppDispatch, RootState } from './store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}

export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}

export function useAppSelector<Result>(selector: (state: RootState) => Result): Result {
  return useSelector<RootState, Result>(selector);
}
