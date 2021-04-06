import Avatar from '@material-ui/core/Avatar';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { useRouter } from 'next/router';
import React from 'react';

import { Conversation } from 'types/Conversation';
import {
  StyledBadge,
  StyledContainer,
  StyledDateText,
  StyledInfoContainer,
  StyledLastMessage,
  StyledRow,
  StyledTitle,
} from './styles';

export interface ConversationProps {
  conversation: Conversation;
  id: string;
  active?: boolean;
}

const ConversationItem: React.FC<ConversationProps> = (props) => {
  const router = useRouter();

  const unreadCount = (props.conversation.messages || []).filter((message) => !message.read).length;
  const lastMessage = (props.conversation.messages || []).length > 0 ? props.conversation.messages[0] : null;

  const lastMessageDate = lastMessage ? lastMessage.when.toDate() : null;

  return (
    <StyledContainer active={props.active} onClick={() => router.push(`/message/${props.id}`)}>
      <Avatar alt={props.conversation.title} src={props.conversation.image} />

      <StyledInfoContainer>
        <StyledRow>
          <StyledTitle>{props.conversation.title}</StyledTitle>

          <StyledDateText>
            {lastMessageDate ? format(lastMessageDate, isToday(lastMessageDate) ? 'p' : 'P') : ' - '}
          </StyledDateText>
        </StyledRow>

        <StyledRow>
          <StyledLastMessage>
            {lastMessage ? lastMessage.text || lastMessage.file?.name || lastMessage.actions.join(', ') : ' - '}
          </StyledLastMessage>

          <StyledBadge badgeContent={unreadCount} color="primary" />
        </StyledRow>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

export default ConversationItem;
