import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import { StyledExtraFieldsContent, StyledExtraFieldsHeader } from './styles';

export interface MessageExtraFieldProps {
  title: string;
  onCancel: () => void;
}

const MessageExtraField: React.FC<MessageExtraFieldProps> = (props) => {
  return (
    <StyledExtraFieldsContent>
      <StyledExtraFieldsHeader>
        <span>
          {props.title}
        </span>

        <IconButton size="small" onClick={props.onCancel} aria-label="close button">
          <CloseIcon/>
        </IconButton>
      </StyledExtraFieldsHeader>

      {props.children}
    </StyledExtraFieldsContent>
  );
};

export default MessageExtraField;
