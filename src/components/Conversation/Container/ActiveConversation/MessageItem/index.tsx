import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import DOMPurify from 'dompurify';
import marked from 'marked';
import React from 'react';
import { useSelector } from 'react-redux';

import MediaTypeUnknown from 'components/Messages/MediaTypes/Unknown';
import { Message, MessageTypes, User } from 'types/Conversation';
import { StoreState } from 'store';
import { StyledActionsContainer, StyledAvatarContainer, StyledDate, StyledMessageContent, StyledReceivedMessage } from './styles';

export interface MessageItemProps {
  message: Message;
  conversationUsers: User[];
}

const MessageItem: React.FC<MessageItemProps> = ({ message, conversationUsers: users }) => {
  const appUser = useSelector((store: StoreState) => store.session.user);

  const messageFrom = users.find((user) => user.id === message.userId);
  const sent = messageFrom?.id === appUser?.id;

  const messageDate = new Date(message.when);

  return (
    <StyledMessageContent kind={sent ? 'sent' : 'received'}>
      {messageFrom && !sent &&
        <StyledAvatarContainer>
          <Avatar src={messageFrom.profilePicture} alt={messageFrom.name}/>
          {messageFrom.name}
        </StyledAvatarContainer>
      }

      <div>
        {(message.text || message.file) &&
          <StyledReceivedMessage kind={sent ? 'sent' : 'received'}>
            {message.file && message.type === MessageTypes.MediaUnknown &&
              <MediaTypeUnknown file={message.file} downloadable={true}/>
            }

            {message.text &&
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(message.text)) }}/>
            }

            <StyledDate>
              {isToday(messageDate) ? format(messageDate, 'p') : format(messageDate, 'Pp')}
            </StyledDate>
          </StyledReceivedMessage>
        }

        <StyledActionsContainer>
          {message.actions.map((action) => (
            <Button key={action} variant="contained" color="primary">
              {action}
            </Button>
          ))}
        </StyledActionsContainer>
      </div>
    </StyledMessageContent>
  );
};

export default MessageItem;
