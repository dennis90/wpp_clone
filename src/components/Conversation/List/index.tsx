import React, { useContext } from 'react';

import DataContext from 'data/dataContext';
import Header from './Header';
import ConversationItem from './Item';
import { StyledContainer } from './styles';

const ConversationList: React.FC = () => {
  const { conversations, selectedConversation } = useContext(DataContext);

  return (
    <StyledContainer>
      <Header/>

      {conversations.map((conversation) =>
        <ConversationItem
          key={conversation.id}
          active={conversation.id === selectedConversation?.id}
          conversation={conversation}
        />,
      )}
    </StyledContainer>
  );
};

export default ConversationList;
