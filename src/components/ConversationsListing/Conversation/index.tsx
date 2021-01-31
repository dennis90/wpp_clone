import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
import isToday from 'date-fns/isToday';
import React from 'react';

import { ConversationDescription } from 'types/Conversation';
import { StyledContainer, StyledInfoContainer, StyledLastMessage, StyledRow } from './styles';

export type ConversationProps = ConversationDescription;

const Conversation: React.FC<ConversationProps> = (props) => (
  <StyledContainer>
    <Avatar alt={props.title} src={props.image}/>

    <StyledInfoContainer>
      <StyledRow>
        <Typography variant="h6" component="span">
          {props.title}
        </Typography>

        {isToday(props.lastActive)
          ? format(props.lastActive, 'p')
          : formatRelative(props.lastActive, new Date())
        }
      </StyledRow>

      <StyledRow>
        <StyledLastMessage>
          {props.description}
        </StyledLastMessage>

        <Badge
          badgeContent={props.unreadMessagesCount}
          color="primary"
        />
      </StyledRow>
    </StyledInfoContainer>
  </StyledContainer>
);

export default Conversation;
