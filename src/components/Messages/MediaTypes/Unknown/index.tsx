import AttachFileIcon from '@material-ui/icons/AttachFile';
import React from 'react';

import { FileInfo } from 'types/Conversation';
import { StyledMediaContent, StyledIconContainer } from './styles';

export interface UnknownMediaProps {
  downloadable?: boolean;
  file: FileInfo;
}

const UnknownMedia: React.FC<UnknownMediaProps> = ({ downloadable = false, file }) => {
  return (
    <StyledMediaContent>
      <StyledIconContainer>
        <AttachFileIcon aria-label="Attachment icon" fontSize="inherit" />
      </StyledIconContainer>

      {!downloadable && <span>{file.name}</span>}

      {downloadable && (
        <a href={file.path} download={file.name}>
          {file.name}
        </a>
      )}
    </StyledMediaContent>
  );
};

export default UnknownMedia;
