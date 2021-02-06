import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledUserHeader = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.primary.dark};
  color: ${({ theme }: { theme: Theme }) => theme.palette.primary.contrastText};
  box-sizing: border-box;
`;

export const StyledUserName = styled.span`
  flex: 1;
  margin: auto 20px;
  font-size: 1.4rem;
  font-weight: 600;
`;
