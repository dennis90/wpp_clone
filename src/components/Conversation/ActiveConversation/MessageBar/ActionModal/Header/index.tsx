import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import { StyledHeader } from './styles';

export interface ActionHeaderProps {
  onClose: () => void;
}

const Header: React.FC<ActionHeaderProps> = (props) => (
  <StyledHeader>
    {props.children}

    <IconButton aria-label="Close panel" onClick={props.onClose} size="small">
      <CloseIcon />
    </IconButton>
  </StyledHeader>
);

export default Header;
