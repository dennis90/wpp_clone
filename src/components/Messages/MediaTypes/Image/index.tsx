import React from 'react';

import { FileInfo } from 'types/Conversation';
import { StyledMediaContent, StyledIconContainer, StyledImage } from './styles';

export interface UnknownMediaProps {
  downloadable?: boolean;
  file: FileInfo;
}

const UnknownMedia: React.FC<UnknownMediaProps> = ({ downloadable = false, file }) => {
  return (
    <StyledMediaContent>
      <StyledIconContainer>
        <StyledImage src={file.path} alt={file.name} />
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
