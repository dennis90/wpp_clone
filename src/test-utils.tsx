// https://redux.js.org/recipes/writing-tests#connected-components

import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer, StoreState } from './store';

interface RenderProps extends Omit<RenderOptions, 'queries'> {
  initialState?: Partial<StoreState>;
  store?: Store;
}

function render(
  ui: React.ReactElement,
  { initialState, store = createStore(rootReducer, initialState), ...renderOptions }: RenderProps = {},
): RenderResult {
  const Wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
