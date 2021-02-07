import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from 'store/actionPanel';
import { StyledHeader } from './styles';

const Header: React.FC = (props) => {
  const dispatch = useDispatch();

  const closePanelClickHandler = (): void => {
    dispatch(actions.setPanelInfo(undefined));
  }

  return (
    <StyledHeader>
      {props.children}

      <IconButton aria-label="Close panel" onClick={closePanelClickHandler} size="small">
        <CloseIcon/>
      </IconButton>
    </StyledHeader>
  );
};

export default Header;
