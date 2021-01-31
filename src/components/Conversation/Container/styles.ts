import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  flex: 9;
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.paper};
  padding: 10px;
`;
