import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledMediaContent = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  border-radius: 6px;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.grey[300]};
  padding: 10px;
  text-align: center;
  width: 150px;

  &:hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.palette.grey[300]};
  }

  span {
    overflow-wrap: break-word;
  }
`;

export const StyledIconContainer = styled.div`
  font-size: 3rem;
  text-align: center;
`;
