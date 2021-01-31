import React from 'react';

import { ConversationDescription } from 'types/Conversation';
import Conversation from './Conversation';
import { StyledContainer } from './styles';

// TODO: This information should come from API Endpoint
const conversationsList: ConversationDescription[] = [
  {
    description: 'Detran - SP - Autenticidade R$ 0, 20',
    id: '100',
    image: 'unknown',
    lastActive: new Date('2021-01-30T23:00:00.000Z'),
    title: 'Sala de chat 1',
    unreadMessagesCount: 1,
  },
  {
    description: 'Olá\n\nMeu nome é Karen, eu sou o robô assistente de cadastro da Intersowa OTC',
    id: '200',
    image: 'unknown',
    lastActive: new Date('2021-01-29T22:00:00.000Z'),
    title: 'Sala de chat 2',
    unreadMessagesCount: 1,
  },
]

const ConversationsListing: React.FC = () => {
  return (
    <StyledContainer>
      {conversationsList.map(
        (conversation) => <Conversation key={conversation.id} {...conversation}/>)
      }
    </StyledContainer>
  );
};

export default ConversationsListing;
