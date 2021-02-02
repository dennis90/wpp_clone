import React, { useState } from 'react';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import DataContext, { SelectConversationHandler, ProviderValue } from 'data/dataContext';
import { StyledContainer } from './styles';

// This should be replaced by actual data
import { initialData } from '__mocks__/dataContextMock';

const Home: React.FC = () => {
  const selectConversation: SelectConversationHandler = (conversationId) => {
    const selectedConversation = providerValue.conversations.find(({ id }) => conversationId === id);

    setProviderValue({
      ...providerValue,
      selectedConversation,
    });
  };

  const [providerValue, setProviderValue] = useState<ProviderValue>({ ...initialData, selectConversation });

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
