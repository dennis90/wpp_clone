import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Conversation, Message } from 'types/Conversation';

export interface ConversationsSlice {
  conversations: Conversation[];
  selectedConversationId?: Conversation['id'];
}

const initialState: ConversationsSlice = {
  conversations: [],
  selectedConversationId: undefined,
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    selectConversationId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedConversationId = action.payload;
    },

    sendMessage: (state, action: PayloadAction<Message>) => {
      const currentConversation = state.conversations.find(({ id }) => id === state.selectedConversationId);
      if (currentConversation) {
        currentConversation.messages = [action.payload, ...currentConversation.messages];
      }
    },

    appendConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations = [action.payload, ...state.conversations];
    }
  }
});

export const actions = conversationsSlice.actions;

export default conversationsSlice.reducer;
