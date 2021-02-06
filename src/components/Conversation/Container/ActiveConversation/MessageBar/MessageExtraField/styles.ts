import { Theme } from '@material-ui/core';
import styled from 'styled-components';

export const StyledExtraFieldsContent = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.divider};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  span {
    font-weight: 500;
    margin: auto 0;
  }
`;

export const StyledExtraFieldsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 5px;
  border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.grey[300]};
`;
