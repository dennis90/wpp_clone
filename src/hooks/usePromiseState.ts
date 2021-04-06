import { useState } from 'react';

import { AsyncState } from '../types/async';

export type usePromiseStateHook<T> = AsyncState<{ data: T }> & {
  request: () => Promise<void>;
};

export default function usePromiseState<T = unknown>(fn: () => Promise<T>): usePromiseStateHook<T> {
  const [state, setState] = useState<AsyncState<{ data: T }>>({ status: undefined });

  const makeRequest = async (): Promise<void> => {
    try {
      setState({ status: 'loading' });
      const result = await fn();
      setState({ status: 'loaded', data: result });
    } catch (e) {
      setState({ status: 'error', error: e });
    }
  };

  return { ...state, request: makeRequest };
}
