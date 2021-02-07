import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import marked from 'marked';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from 'store';
import { actions } from 'store/conversations';
import { actions as actionPanelActions } from 'store/actionPanel'
import { ActionTypes, Message, MessageTypes } from 'types/Conversation';
import UploadDocument from './UploadDocument';
import { StyledMessageBarContainer, StyledTextField, StyledNewMessageContent, StyledIconButton } from './styles';

export type MessageForm = Omit<Message, 'when'>

const MessageBar: React.FC = () => {
  const appUser = useSelector((store: StoreState) => store.session.user);
  const dispatch = useDispatch();

  const initialMessageValue: MessageForm = {
    text: '',
    type: MessageTypes.Text,
    actions: [],
    userId: appUser?.id ?? '',
    read: true,
  };

  const [message, setMessage] = useState<MessageForm>(initialMessageValue);

  const fileUploadChangeHandler = (file: File): void => {
    // TODO: This file should be uploaded to a media storage service
    const filePath = window.URL.createObjectURL(file);

    dispatch(actionPanelActions.setPanelInfo({
      actionType: ActionTypes.SendDocument,
      documentName: file.name,
      documentPath: filePath,
      initialMessage: message.text ?? '',
    }));
  };

  const messageTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage({
      ...message,
      text: event.target.value,
    });
  };

  const sendMessageClickHandler = (): void => {
    dispatch(actions.sendMessage({
      ...message,
      when: new Date().toISOString(),
    }));
    setMessage(initialMessageValue);
  }

  const inputHelperText = (
    <span
      dangerouslySetInnerHTML={{
        __html: marked.parseInline('*&ast;italic&ast;*&nbsp;&nbsp;**&ast;&ast;bold&ast;&ast;**&nbsp;&nbsp;')
      }}
    />
  );

  const sendMessageButtonEnabled = (
    (message.type === MessageTypes.MediaUnknown && message.file !== undefined) ||
    (message.type === MessageTypes.Text && message.text !== '')
  );

  return (
    <StyledMessageBarContainer>
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
          disabled={!sendMessageButtonEnabled}
          aria-label="Send message"
        >
          <SendIcon/>
        </StyledIconButton>
      </StyledNewMessageContent>
    </StyledMessageBarContainer>
  );
};

export default MessageBar;
