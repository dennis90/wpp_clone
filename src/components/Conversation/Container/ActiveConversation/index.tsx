import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Conversation } from 'types/Conversation';
import { actions as actionPanelActions } from 'store/actionPanel';
import ActionModal from '../../ActionModal';
import Header from './Header';
import MessageBar from './MessageBar';
import MessageItem from './MessageItem';
import { StyledConversationContent, StyledMessagesContainer } from './styles';

export interface ActiveConversationProps {
  conversation: Conversation;
}

const ActiveConversation: React.FC<ActiveConversationProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actionPanelActions.setPanelInfo(undefined));
    }
  }, [dispatch, props.conversation.id]);

  return (
    <StyledConversationContent>
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

      <ActionModal/>
    </StyledConversationContent>
  );
};

export default ActiveConversation;
