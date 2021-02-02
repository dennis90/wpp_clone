import { createContext } from 'react';

import { Conversation, User } from 'types/Conversation';

export type SelectConversationHandler = (conversation?: Conversation['id']) => void;

export interface ProviderValue {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  user?: User;
  selectConversation: SelectConversationHandler;
}

const initialProviderValue: ProviderValue = {
  conversations: [],
  selectedConversation: undefined,
  user: undefined,
  selectConversation: () => ({}),
}

export default createContext<ProviderValue>(initialProviderValue);
