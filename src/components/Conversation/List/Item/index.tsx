import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
import isToday from 'date-fns/isToday';
import React from 'react';

import { Conversation } from 'types/Conversation';
import { StyledBadge, StyledContainer, StyledDateText, StyledInfoContainer, StyledLastMessage, StyledRow, StyledTitle } from './styles';

export type ConversationProps = Conversation;

const ConversationItem: React.FC<ConversationProps> = (props) => {
  const unreadCount = props.messages.filter((message) => !message.read).length;
  const lastMessage = props.messages[0];

  return (
    <StyledContainer>
      <Avatar alt={props.title} src={props.image}/>

      <StyledInfoContainer>
        <StyledRow>
          <StyledTitle>
            {props.title}
          </StyledTitle>

          <StyledDateText>
            {format(lastMessage.when, isToday(lastMessage.when) ? 'p' : 'P')}
          </StyledDateText>
        </StyledRow>

        <StyledRow>
          <StyledLastMessage>
            {lastMessage.text}
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
