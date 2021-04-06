import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';

import MediaTypeImage from 'components/Messages/MediaTypes/Image';
import MediaTypeUnknown from 'components/Messages/MediaTypes/Unknown';
import { StyledPanelContainer, StyledPanelContent, StyledPanelFooter } from './styles';
import { FileInfo } from 'types/Conversation';

export interface SendFileProps {
  initialMessage: string;
  file: FileInfo;
  onMessageSent: (message: string) => void;
}

const SendFile: React.FC<SendFileProps> = (props) => {
  const [messageText, setMessageText] = useState<string>(props.initialMessage);

  const messageInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessageText(event.target.value);
  };

  const sendMessageClickHandler = (): void => {
    props.onMessageSent(messageText);
  };

  const fileInfo = {
    name: props.file.name,
    path: props.file.path,
    type: props.file.type,
  };

  return (
    <StyledPanelContainer>
      <StyledPanelContent>
        {props.file.type.startsWith('image') ? (
          <MediaTypeImage file={fileInfo} downloadable={false} />
        ) : (
          <MediaTypeUnknown file={fileInfo} downloadable={false} />
        )}
      </StyledPanelContent>

      <StyledPanelFooter>
        <TextField
          fullWidth={true}
          onChange={messageInputChangeHandler}
          value={messageText}
          placeholder="Informe a legenda da imagem"
          aria-label="Image label"
        />

        <IconButton aria-label="Send message" onClick={sendMessageClickHandler}>
          <SendIcon />
        </IconButton>
      </StyledPanelFooter>
    </StyledPanelContainer>
  );
};

export default SendFile;
