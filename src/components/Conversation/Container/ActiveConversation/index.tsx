import React from 'react';

import { Conversation } from 'types/Conversation';
import Header from './Header';

export interface ActiveConversationProps {
  conversation: Conversation;
}

const ActiveConversation: React.FC<ActiveConversationProps> = (props) => {
  return (
    <div>
      <Header
        image={props.conversation.image}
        title={props.conversation.title}
        users={props.conversation.users}
      />

      {props.conversation.messages.map((message, index) => <span key={index}>{message.text}</span>)}
    </div>
  );
};

export default ActiveConversation;
