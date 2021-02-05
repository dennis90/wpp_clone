import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'types/Conversation';

// TODO: This should be replaced by real data
import { users } from '__mocks__/data';

export interface SessionSlice {
  user?: User;
}

// TODO: This should be replaced by real data
const initialState: SessionSlice = {
  user: users.johnDoe,
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

export default sessionSlice.reducer;
