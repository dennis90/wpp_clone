import { CircularProgress } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import { useRouter } from 'next/router';
import marked from 'marked';
import React, { useEffect, useState } from 'react';

import { storage } from 'config/firebase';
import { Message, MessageTypes } from 'types/Conversation';
import AudioRecord from './AudioRecord';
import UploadDocument from './UploadDocument';
import { StyledIconButton, StyledMessageBarContainer, StyledNewMessageContent, StyledTextField } from './styles';
import useCurrentUser from 'hooks/useUserId';
import ActionModal, { ActionHeader } from './ActionModal';
import { sendMessage } from 'services/queries';
import SendFile from './ActionModal/forms/SendFile';
import SendPhoto, { PHOTO_MIME } from './ActionModal/forms/SendPhoto';
import usePrevious from 'hooks/usePrevious';

export type MessageForm = Omit<Message, 'when' | 'userId'>;

enum ActionModalEnum {
  SendPhoto = 1,
  SendFile,
}

const initialMessageValue: MessageForm = {
  text: '',
  type: MessageTypes.Text,
  actions: [],
  read: true,
};

const MessageBar: React.FC = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState<MessageForm>(initialMessageValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ActionModalEnum | undefined>(undefined);

  const prevModalValue = usePrevious(modal);

  useEffect(() => {
    if (modal === undefined && modal !== prevModalValue) {
      if (message.file) {
        window.URL.revokeObjectURL(message.file.path);
        setMessage(initialMessageValue);
      }
    }
  }, [message, message.file, modal, prevModalValue]);

  const fileUploadChangeHandler = (file: File): void => {
    const fileURL = window.URL.createObjectURL(file);

    setMessage((msg) => ({
      ...msg,
      type: MessageTypes.File,
      file: {
        name: file.name,
        type: file.type,
        path: fileURL,
      },
    }));

    setModal(ActionModalEnum.SendFile);
  };

  const photoTakenHandler = (fileDataURL: string): void => {
    setMessage((msg) => ({
      ...msg,
      type: MessageTypes.File,
      file: {
        name: `${new Date().valueOf().toString()}.png`,
        type: PHOTO_MIME,
        path: fileDataURL,
      },
    }));

    setModal(ActionModalEnum.SendFile);
  };

  const fileMessageConfirmedHandler = async (messageText: string): Promise<void> => {
    try {
      setLoading(true);
      if (!message.file) {
        throw Error('File not found');
      }

      const fileRef = storage.ref().child(`images/${pid}/${message.file.name}`);
      await fileRef.putString(message.file.path);
      const fileURL = fileRef.fullPath;

      await sendMessage(pid as string, {
        ...message,
        text: messageText,
        userId: currentUser?.uid ?? '',
        file: {
          ...message.file,
          path: fileURL,
        },
      });

      setMessage(initialMessageValue);
    } finally {
      setModal(undefined);
      setLoading(false);
    }
  };

  const modalCanceledHandler = (): void => {
    setModal(undefined);
  };

  const takePictureClickHandler = (): void => {
    setModal(ActionModalEnum.SendPhoto);
  };

  const messageTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage({
      ...message,
      text: event.target.value,
    });
  };

  const sendMessageClickHandler = async (): Promise<void> => {
    await sendMessage(pid as string, { ...message, userId: currentUser?.uid ?? '' });
    setMessage(initialMessageValue);
  };

  const audioRecordedHandler = async (audio: File): Promise<void> => {
    try {
      setLoading(true);

      const fileRef = storage.ref().child(`audios/${pid}/${audio.name}`);
      await fileRef.put(audio);
      const audioURL = await fileRef.getDownloadURL();

      await sendMessage(pid as string, {
        actions: [],
        type: MessageTypes.Audio,
        userId: currentUser?.uid ?? '',
        text: '',
        file: {
          name: `audio_${new Date().toISOString()}.ogg`,
          path: audioURL,
          type: audio.type,
        },
      });
    } finally {
      setLoading(false);
    }
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
    <>
      <StyledMessageBarContainer>
        <StyledNewMessageContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <UploadDocument onChange={fileUploadChangeHandler} id="attach-file-input" />
          )}

          {loading ? (
            <CircularProgress />
          ) : (
            <StyledIconButton onClick={takePictureClickHandler} size="small" aria-label="Take picture">
              <CameraAltIcon fontSize="large" />
            </StyledIconButton>
          )}

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
            <StyledIconButton
              disabled={loading}
              size="small"
              onClick={sendMessageClickHandler}
              aria-label="Send message"
            >
              {loading ? <CircularProgress /> : <SendIcon />}
            </StyledIconButton>
          ) : (
            <AudioRecord onAudioRecorded={audioRecordedHandler} />
          )}
        </StyledNewMessageContent>
      </StyledMessageBarContainer>

      <ActionModal open={modal !== undefined}>
        {modal === ActionModalEnum.SendPhoto && (
          <>
            <ActionHeader onClose={modalCanceledHandler}>Tire uma foto</ActionHeader>
            <SendPhoto onPhotoTaken={photoTakenHandler} />
          </>
        )}

        {modal === ActionModalEnum.SendFile && message.file && (
          <>
            <ActionHeader onClose={modalCanceledHandler}>Adicione uma legenda</ActionHeader>
            <SendFile
              initialMessage={message.text ?? ''}
              onMessageSent={fileMessageConfirmedHandler}
              file={message.file}
            />
          </>
        )}

        {modal !== undefined && loading && <CircularProgress />}
      </ActionModal>
    </>
  );
};

export default MessageBar;
