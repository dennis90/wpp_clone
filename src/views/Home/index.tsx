import React, { useCallback, useState } from 'react';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import { StyledContainer } from './styles';

import DataContext, { initialData, SelectConversationHandler, ProviderData } from './dataContext';

const Home: React.FC = () => {
  const selectConversation: SelectConversationHandler = (conversation) => {
    setProviderValue({
      ...providerValue,
      selectedConversation: conversation,
    });
  };

  const [providerValue, setProviderValue] = useState<ProviderData>({ ...initialData, selectConversation });

  return (
    <DataContext.Provider value={providerValue}>
      <StyledContainer>
        <ConversationList/>
        <ConversationContainer/>
      </StyledContainer>
    </DataContext.Provider>
  );
};

export default Home;
