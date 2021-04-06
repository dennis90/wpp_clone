import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Conversation } from 'types/Conversation';
import { actions as actionPanelActions } from 'store/actionPanel';
import Header from './Header';
import MessageBar from './MessageBar';
import { StyledConversationContent } from './styles';
import MessagesList from './MessagesList';

export interface ActiveConversationProps {
  conversation: Conversation;
  id: string;
}

const ActiveConversation: React.FC<ActiveConversationProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actionPanelActions.setPanelInfo(undefined));
    };
  }, [dispatch, props.id]);

  return (
    <StyledConversationContent>
      <Header image={props.conversation.image} title={props.conversation.title} users={props.conversation.users} />
      <MessagesList conversationId={props.id} conversationUsers={props.conversation.users} />
      <MessageBar />
    </StyledConversationContent>
  );
};

export default ActiveConversation;
