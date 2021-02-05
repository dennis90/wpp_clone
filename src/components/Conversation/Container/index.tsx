import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import ActiveConversation from './ActiveConversation';
import EmptyPlaceholder from './EmptyPlaceholder';
import { StyledContainer } from './styles';

const ConversationContainer: React.FC = () => {
  const conversationsState = useSelector((store: StoreState) => store.conversations);
  const selectedConversation = conversationsState.conversations.find(({ id }) => id === conversationsState.selectedConversationId);

  return (
    <StyledContainer>
      {!selectedConversation && <EmptyPlaceholder/>}
      {selectedConversation && <ActiveConversation conversation={selectedConversation}/>}
    </StyledContainer>
  );
}

export default ConversationContainer;
