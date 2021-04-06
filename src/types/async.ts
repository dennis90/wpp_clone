export type AsyncState<T extends Record<string, unknown> = Record<string, never>, E extends Error = Error> =
  | (Partial<T> & {
      status?: 'loading' | undefined;
      error?: undefined;
    })
  | (Partial<T> & {
      status: 'error';
      error: E;
    })
  | (T & {
      status: 'loaded';
      error?: undefined;
    });
