import React from 'react';

import { Conversation } from 'types/Conversation';
import Header from './Header';
import MessageBar from './MessageBar';
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
      {props.conversation.messages.map((message, index) =>
        <MessageItem
          conversationUsers={props.conversation.users}
          key={index}
          message={message}
        />,
      )}
    </StyledMessagesContainer>

    <MessageBar/>
  </div>
);

export default ActiveConversation;
