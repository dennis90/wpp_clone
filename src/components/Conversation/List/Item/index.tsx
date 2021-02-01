import Avatar from '@material-ui/core/Avatar';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import React, { useContext } from 'react';

import { Conversation } from 'types/Conversation';
import { StyledBadge, StyledContainer, StyledDateText, StyledInfoContainer, StyledLastMessage, StyledRow, StyledTitle } from './styles';

import DataContext from 'views/Home/dataContext';

export interface ConversationProps {
  conversation: Conversation;
  active?: boolean;
}

const ConversationItem: React.FC<ConversationProps> = (props) => {
  const { selectConversation } = useContext(DataContext);
  const unreadCount = props.conversation.messages.filter((message) => !message.read).length;
  const lastMessage = props.conversation.messages[0];

  return (
    <StyledContainer
      active={props.active}
      onClick={() => selectConversation(props.conversation)}
    >
      <Avatar alt={props.conversation.title} src={props.conversation.image}/>

      <StyledInfoContainer>
        <StyledRow>
          <StyledTitle>
            {props.conversation.title}
          </StyledTitle>

          <StyledDateText>
            {format(lastMessage.when, isToday(lastMessage.when) ? 'p' : 'P')}
          </StyledDateText>
        </StyledRow>

        <StyledRow>
          <StyledLastMessage>
            {lastMessage.text ? lastMessage.text : lastMessage.actions.join(', ')}
          </StyledLastMessage>

          {unreadCount > 0 &&
            <StyledBadge>
              {unreadCount}
            </StyledBadge>
          }

        </StyledRow>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

export default ConversationItem;
