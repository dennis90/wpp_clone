import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import marked from 'marked';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import React, { useContext } from 'react';

import { Message, User } from 'types/Conversation';

import DataContext from 'views/Home/dataContext';
import { StyledMessageContent, StyledAvatarContainer, StyledReceivedMessage, StyledDate, StyledActionsContainer } from './styles';

export interface MessageItemProps {
  message: Message;
  users: User[];
}

const MessageItem: React.FC<MessageItemProps> = ({ message, users }) => {
  const { user: appUser } = useContext(DataContext);

  const messageFrom = users.find((user) => user.id === message.userId)!;
  const sent = messageFrom.id === appUser.id;

  return (
    <StyledMessageContent kind={sent ? 'sent' : 'received'}>
      <StyledAvatarContainer>
        <Avatar src={messageFrom.profilePicture} alt={messageFrom.name}/>
        {messageFrom.name}
      </StyledAvatarContainer>

      <div>
        {message.text &&
          <StyledReceivedMessage kind={sent ? 'sent' : 'received'}>
            <p dangerouslySetInnerHTML={{ __html: marked(message.text) }}/>

            <StyledDate>
              {isToday(message.when) ? format(message.when, 'p') : format(message.when, 'Pp')}
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
