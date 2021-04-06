import React from 'react';

import { FileInfo } from 'types/Conversation';
import { StyledMediaContent, StyledIconContainer, StyledImage } from './styles';

export interface ImageMediaProps {
  downloadable?: boolean;
  file: FileInfo;
}

const ImageMedia: React.FC<ImageMediaProps> = ({ downloadable = false, file }) => {
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

export default ImageMedia;
