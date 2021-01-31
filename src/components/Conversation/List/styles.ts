import { Theme } from '@material-ui/core';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  box-sizing: border-box;
  flex: 3;
  height: 100%;
`;
