import { combineReducers, configureStore } from '@reduxjs/toolkit'

import conversationsSlice from './conversations';
import sessionSlice from './session';

export const rootReducer = combineReducers({
  conversations: conversationsSlice,
  session: sessionSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
