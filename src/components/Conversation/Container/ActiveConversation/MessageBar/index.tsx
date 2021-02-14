import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import marked from 'marked';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from 'store';
import { actions as conversationsActions } from 'store/conversations';
import { actions as actionPanelActions } from 'store/actionPanel';
import { ActionTypes, Message, MessageTypes } from 'types/Conversation';
import AudioRecord from './AudioRecord';
import UploadDocument from './UploadDocument';
import { StyledIconButton, StyledMessageBarContainer, StyledNewMessageContent, StyledTextField } from './styles';

export type MessageForm = Omit<Message, 'when'>;

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

    dispatch(
      actionPanelActions.setPanelInfo({
        actionType: ActionTypes.SendFile,
        documentName: file.name,
        documentPath: filePath,
        documentType: file.type,
        initialMessage: message.text ?? '',
      }),
    );
  };

  const takePictureClickHandler = (): void => {
    dispatch(actionPanelActions.setPanelInfo({ actionType: ActionTypes.TakePhoto }));
  };

  const messageTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage({
      ...message,
      text: event.target.value,
    });
  };

  const sendMessageClickHandler = (): void => {
    dispatch(
      conversationsActions.sendMessage({
        ...message,
        when: new Date().toISOString(),
      }),
    );
    setMessage(initialMessageValue);
  };

  const audioRecordedHandler = (audio: string): void => {
    dispatch(
      conversationsActions.sendMessage({
        actions: [],
        type: MessageTypes.Audio,
        userId: appUser?.id ?? '',
        when: new Date().toISOString(),
        text: '',
        file: {
          name: `audio_${new Date().toISOString()}.ogg`,
          path: audio,
          type: 'audio/ogg',
        },
      }),
    );
  };

  const inputHelperText = (
    <span
      dangerouslySetInnerHTML={{
        __html: marked.parseInline('*&ast;italic&ast;*&nbsp;&nbsp;**&ast;&ast;bold&ast;&ast;**&nbsp;&nbsp;'),
      }}
    />
  );

  const sendMessageButtonEnabled = message.type === MessageTypes.Text && message.text !== '';

  return (
    <StyledMessageBarContainer>
      <StyledNewMessageContent>
        <UploadDocument onChange={fileUploadChangeHandler} id="attach-file-input" />

        <StyledIconButton onClick={takePictureClickHandler} size="small" aria-label="Take picture">
          <CameraAltIcon fontSize="large" />
        </StyledIconButton>

        <StyledTextField
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

        {sendMessageButtonEnabled ? (
          <StyledIconButton size="small" onClick={sendMessageClickHandler} aria-label="Send message">
            <SendIcon />
          </StyledIconButton>
        ) : (
          <AudioRecord onAudioRecorded={audioRecordedHandler} />
        )}
      </StyledNewMessageContent>
    </StyledMessageBarContainer>
  );
};

export default MessageBar;
