import type { ReactElement, PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { rootReducer, type RootState } from '../app/store';

// Moi test tao store MOI de cac test khong anh huong lan nhau
export function renderWithProviders(
  ui: ReactElement,
  preloadedState?: Partial<RootState>,
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  });

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
