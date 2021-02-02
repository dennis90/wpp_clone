import React, { useContext } from 'react';

import EmptyPlaceholder from './EmptyPlaceholder';
import { StyledContainer } from './styles';

import DataContext from 'data/dataContext';
import ActiveConversation from './ActiveConversation';

const ConversationContainer: React.FC = () => {
  const { selectedConversation } = useContext(DataContext);

  return (
    <StyledContainer>
      {!selectedConversation && <EmptyPlaceholder/>}
      {selectedConversation && <ActiveConversation conversation={selectedConversation}/>}
    </StyledContainer>
  );
}

export default ConversationContainer;
