import { Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const StyledMessageBarContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
`;

export const StyledTextField = styled(TextField)`
  margin: 5px 0 !important;
  flex: 1;
`;

export const StyledIconButton = styled(IconButton).attrs({ component: 'span' })`
  height: 42px;
  width: 42px;
  margin: 20px 10px;
`;

export const StyledNewMessageContent = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  min-height: 40px;
  display: flex;

  ${StyledIconButton} + ${StyledIconButton} {
    margin-left: 0;
  }
`;
