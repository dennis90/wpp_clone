import { configureStore } from '@reduxjs/toolkit'

import conversationsSlice from './conversations';
import sessionSlice from './session';

const store = configureStore({
  reducer: {
    conversations: conversationsSlice,
    session: sessionSlice,
  },
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
