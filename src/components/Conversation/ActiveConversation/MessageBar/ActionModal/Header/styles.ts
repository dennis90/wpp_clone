import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.divider};
`;
