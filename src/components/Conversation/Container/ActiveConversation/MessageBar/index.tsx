import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import marked from 'marked';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MediaTypeUnknown from 'components/Messages/MediaTypes/Unknown';
import { StoreState } from 'store';
import { actions } from 'store/conversations';
import { Message, MessageTypes } from 'types/Conversation';
import MessageExtraField from './MessageExtraField';
import UploadDocument from './UploadDocument';
import { StyledMessageBarContainer, StyledTextField, StyledNewMessageContent, StyledIconButton } from './styles';

const MessageBar: React.FC = () => {
  const appUser = useSelector((store: StoreState) => store.session.user);
  const dispatch = useDispatch();

  const [message, setMessage] = useState<Message | null>(null);

  const fileUploadChangeHandler = (file: File): void => {
    // TODO: This file should be uploaded to a media storage service
    const filePath = window.URL.createObjectURL(file);

    setMessage({
      actions: [],
      file: { name: file.name, path: filePath },
      read: true,
      type: MessageTypes.MediaUnknown,
      userId: appUser?.id ?? '',
      when: new Date().toISOString(),
    });
  };

  const messageTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (message) {
      setMessage({
        ...message,
        text: event.target.value,
      });
    }
  };

  const sendMessageClickHandler = (): void => {
    if (message) {
      dispatch(actions.sendMessage(message));
      setMessage(null);
    }
  }

  const cancelMessage = (): void => {
    setMessage(null);
  };

  const inputHelperText = (
    <span
      dangerouslySetInnerHTML={{
        __html: marked.parseInline('*&ast;italic&ast;*&nbsp;&nbsp;**&ast;&ast;bold&ast;&ast;**&nbsp;&nbsp;')
      }}
    />
  );

  return (
    <StyledMessageBarContainer>
      {message && message.type === MessageTypes.MediaUnknown && message.file &&
        <MessageExtraField
          onCancel={cancelMessage}
          title="Digite a legenda do arquivo"
        >
          <MediaTypeUnknown file={message.file}/>
        </MessageExtraField>
      }

      <StyledNewMessageContent>
        <UploadDocument onChange={fileUploadChangeHandler} id="attach-file-input"/>
        <CameraAltIcon/>
        <StyledTextField
          fullWidth={true}
          helperText={inputHelperText}
          multiline={true}
          placeholder="Escreva uma mensagem"
          rows={1}
          rowsMax={5}
          size="medium"
          variant="outlined"
          value={message?.text || ''}
          onChange={messageTextChangeHandler}
        />
        <StyledIconButton
          size="small"
          onClick={sendMessageClickHandler}
          disabled={!message}
          aria-label="Send message"
        >
          <SendIcon/>
        </StyledIconButton>
      </StyledNewMessageContent>
    </StyledMessageBarContainer>
  );
};

export default MessageBar;
