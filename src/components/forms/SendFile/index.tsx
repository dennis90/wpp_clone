import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionModalHeader from 'components/Conversation/ActionModal/Header';
import MediaTypeImage from 'components/Messages/MediaTypes/Image';
import MediaTypeUnknown from 'components/Messages/MediaTypes/Unknown';
import { StoreState } from 'store';
import { actions as actionPanelActions } from 'store/actionPanel';
import { actions as conversationActions } from 'store/conversations';
import { ActionTypes, MessageTypes } from 'types/Conversation';
import { StyledPanelContainer, StyledPanelContent, StyledPanelFooter } from './styles';

const SendFile: React.FC = () => {
  const panelInfo = useSelector((store: StoreState) => store.actionPanel.panelInfo);
  const { selectedConversationId } = useSelector((store: StoreState) => store.conversations);
  const appUser = useSelector((store: StoreState) => store.session.user);

  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState<string>(
    panelInfo?.actionType === ActionTypes.SendFile ? panelInfo.initialMessage : '',
  );

  if (panelInfo?.actionType !== ActionTypes.SendFile || selectedConversationId === undefined) {
    return null;
  }

  const messageInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessageText(event.target.value);
  };

  const sendMessageClickHandler = (): void => {
    dispatch(
      conversationActions.sendMessage({
        actions: [],
        type: MessageTypes.File,
        userId: appUser?.id ?? '',
        when: new Date().toISOString(),
        file: {
          name: panelInfo.documentName,
          path: panelInfo.documentPath,
          type: panelInfo.documentType,
        },
        read: true,
        text: messageText,
      }),
    );

    dispatch(actionPanelActions.setPanelInfo(undefined));
  };

  const file = {
    name: panelInfo.documentName,
    path: panelInfo.documentPath,
    type: panelInfo.documentType,
  };

  return (
    <StyledPanelContainer>
      <ActionModalHeader>Adicionar legenda</ActionModalHeader>

      <StyledPanelContent>
        {panelInfo.documentType.startsWith('image') ? (
          <MediaTypeImage file={file} downloadable={false} />
        ) : (
          <MediaTypeUnknown file={file} downloadable={false} />
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
