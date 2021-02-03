import React, { useContext } from 'react';

import DataContext from 'data/dataContext';
import ActiveConversation from './ActiveConversation';
import EmptyPlaceholder from './EmptyPlaceholder';
import { StyledContainer } from './styles';

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
