import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Header from './Header';
import ConversationItem from './Item';
import { StyledContainer } from './styles';

const ConversationList: React.FC = () => {
  const { conversations, selectedConversationId } = useSelector((store: StoreState) => store.conversations);

  return (
    <StyledContainer>
      <Header />

      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          active={conversation.id === selectedConversationId}
          conversation={conversation}
        />
      ))}
    </StyledContainer>
  );
};

export default ConversationList;
