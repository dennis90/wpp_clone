import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import DOMPurify from 'dompurify';
import marked from 'marked';
import React from 'react';

import MediaTypeImage from 'components/Messages/MediaTypes/Image';
import MediaTypeUnknown from 'components/Messages/MediaTypes/Unknown';
import { ActionTypes, Message, MessageTypes, Profile } from 'types/Conversation';
import {
  StyledActionsContainer,
  StyledAvatarContainer,
  StyledDate,
  StyledMessageContent,
  StyledReceivedMessage,
} from './styles';
import { formTypeGreeting } from 'types/Forms';
import { isDate } from 'date-fns';
import useCurrentUser from 'hooks/useUserId';
import { useDispatch } from 'react-redux';
import { actions as actionPanelActions } from 'store/actionPanel';

export interface MessageItemProps {
  message: Message;
  conversationUsers: Profile[];
}

const MessageItem: React.FC<MessageItemProps> = ({ message, conversationUsers: users }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const messageFrom = users.find((user) => user.uid === message.userId);

  const sent = messageFrom !== undefined && messageFrom.uid === currentUser?.uid;

  const messageDate = message.when?.toDate() || new Date();

  let messageContent = message.text;

  if (!messageContent && message.form) {
    messageContent = formTypeGreeting[message.form.form];
    const { chat_id: _, form: __, ...formFields } = message.form;

    type FormKeys = keyof typeof formFields;

    messageContent += (Object.keys(formFields) as FormKeys[])
      .map((key) => {
        if (typeof formFields[key] === 'string') {
          return `${key}: ${formFields[key]}`;
        }

        if (isDate(formFields[key])) {
          return `${key}: ${format(new Date(formFields[key]), 'P')}`;
        }

        return `${key}: ${String(formFields[key])}`;
      })
      .join('\n');
  }

  const actionDispatchHandler = (actionType: ActionTypes): void => {
    if (actionType === ActionTypes.Register) {
      dispatch(actionPanelActions.setPanelInfo({ actionType }));
    }
  };

  return (
    <StyledMessageContent kind={sent ? 'sent' : 'received'}>
      {messageFrom && !sent && (
        <StyledAvatarContainer>
          <Avatar src={messageFrom.photo} alt={messageFrom.name} />
          {messageFrom.name}
        </StyledAvatarContainer>
      )}

      <div>
        {(messageContent || message.file) && (
          <StyledReceivedMessage kind={sent ? 'sent' : 'received'}>
            {message.file && message.type === MessageTypes.File && (
              <>
                {message.file.type.startsWith('image') ? (
                  <MediaTypeImage file={message.file} downloadable={true} />
                ) : (
                  <MediaTypeUnknown file={message.file} downloadable={true} />
                )}
              </>
            )}

            {message.type === MessageTypes.Audio && message.file && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio
                controls={true}
                id={message.file.name}
                src={message.file.path}
                aria-label={`Audio field ${message.file.name}`}
              />
            )}

            {messageContent && <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(messageContent)) }} />}

            <StyledDate>{isToday(messageDate) ? format(messageDate, 'p') : format(messageDate, 'Pp')}</StyledDate>
          </StyledReceivedMessage>
        )}

        <StyledActionsContainer>
          {(message.actions || []).map((action) => (
            <Button key={action} variant="contained" color="primary" onClick={() => actionDispatchHandler(action)}>
              {action}
            </Button>
          ))}
        </StyledActionsContainer>
      </div>
    </StyledMessageContent>
  );
};

export default MessageItem;
