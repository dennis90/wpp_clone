import React from 'react';

import { Conversation } from 'types/Conversation';
import Header from './Header';
import MessageItem from './MessageItem';
import { StyledMessagesContainer } from './styles';

export interface ActiveConversationProps {
  conversation: Conversation;
}

const ActiveConversation: React.FC<ActiveConversationProps> = (props) => (
  <div>
    <Header
      image={props.conversation.image}
      title={props.conversation.title}
      users={props.conversation.users}
    />

    <StyledMessagesContainer>
      {props.conversation.messages.map((message, index) => <MessageItem message={message} key={index} users={props.conversation.users}/>)}
    </StyledMessagesContainer>
  </div>
);

export default ActiveConversation;
