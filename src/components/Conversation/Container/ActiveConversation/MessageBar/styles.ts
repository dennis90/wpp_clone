import { Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const StyledMessageBarContainer = styled.div`
  display: flex;
  background: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  min-height: 40px;
  width: 100%;
  box-sizing: border-box;

  svg {
    margin: 20px 10px;
  }

  svg + svg {
    margin-left: 0;
  }
`;

export const StyledTextField = styled(TextField)`
  margin: 5px 0 !important;
  flex: 1;
`;
