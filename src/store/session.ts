import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'types/Conversation';

export interface SessionSlice {
  user?: User;
}

const initialState: SessionSlice = {
  user: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const actions = sessionSlice.actions;

export default sessionSlice.reducer;
