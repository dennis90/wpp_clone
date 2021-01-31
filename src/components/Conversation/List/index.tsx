import React from 'react';

import { ConversationDescription } from 'types/Conversation';
import ConversationItem from './Item';
import { StyledContainer } from './styles';

// TODO: This information should come from API Endpoint
const conversations: ConversationDescription[] = [
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

const ConversationList: React.FC = () => {
  return (
    <StyledContainer>
      {conversations.map(
        (conversation) => <ConversationItem key={conversation.id} {...conversation}/>)
      }
    </StyledContainer>
  );
};

export default ConversationList;
