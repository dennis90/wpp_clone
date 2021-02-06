import AttachFileIcon from '@material-ui/icons/AttachFile';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import marked from 'marked';
import React from 'react';
import { StyledMessageBarContainer, StyledTextField } from './styles';

const MessageBar: React.FC = () => {
  const inputHelperText = <div dangerouslySetInnerHTML={{ __html: marked.parseInline('*&ast;italic&ast;*&nbsp;&nbsp;**&ast;&ast;bold&ast;&ast;**&nbsp;&nbsp;') }} />;

  return (
    <StyledMessageBarContainer>
      <AttachFileIcon/>
      <CameraAltIcon />
      <StyledTextField
        fullWidth={true}
        helperText={inputHelperText}
        multiline={true}
        placeholder="Escreva uma mensagem"
        rows={1}
        rowsMax={5}
        size="medium"
        variant="outlined"
      />
      <SendIcon/>
    </StyledMessageBarContainer>
  );
};

export default MessageBar;
