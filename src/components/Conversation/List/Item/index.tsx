import Avatar from '@material-ui/core/Avatar';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from 'store/conversations';
import { Conversation } from 'types/Conversation';
import { StyledBadge, StyledContainer, StyledDateText, StyledInfoContainer, StyledLastMessage, StyledRow, StyledTitle } from './styles';

export interface ConversationProps {
  conversation: Conversation;
  active?: boolean;
}

const ConversationItem: React.FC<ConversationProps> = (props) => {
  const dispatch = useDispatch();

  const unreadCount = props.conversation.messages.filter((message) => !message.read).length;
  const lastMessage = props.conversation.messages[0];

  const lastMessageDate = new Date(props.conversation.messages[0].when);

  return (
    <StyledContainer
      active={props.active}
      onClick={() => dispatch(actions.selectConversationId(props.conversation.id))}
    >
      <Avatar alt={props.conversation.title} src={props.conversation.image}/>

      <StyledInfoContainer>
        <StyledRow>
          <StyledTitle>
            {props.conversation.title}
          </StyledTitle>

          <StyledDateText>
            {format(lastMessageDate, isToday(lastMessageDate) ? 'p' : 'P')}
          </StyledDateText>
        </StyledRow>

        <StyledRow>
          <StyledLastMessage>
            {lastMessage.text ? lastMessage.text : lastMessage.actions.join(', ')}
          </StyledLastMessage>

          <StyledBadge badgeContent={unreadCount} color="primary"/>
        </StyledRow>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

export default ConversationItem;
