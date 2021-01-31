import React from 'react';

import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export interface StyledContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const StyledContainer = styled.div<StyledContainerProps>`
  background-color: ${
    ({ active, theme }: { theme: Theme } & StyledContainerProps) =>
      active
        ? theme.palette.grey[200]
        : theme.palette.background.paper
  };
  border-color: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  border-style: solid;
  border-width: 1px 0;
  display: flex;
  padding: 10px;
  cursor: pointer;
  transition: background-color ease-in-out 150ms;

  &:hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  }
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledRow = styled.div`
  display: flex;
  margin-left: 10px;
  justify-content: space-between;
`;

export const StyledLastMessage = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`;

export const StyledDateText = styled.span`
  font-size: 1rem;
  margin: auto 0;
`;

export const StyledBadge = styled.span`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.primary.dark};
  border-radius: 50%;
  box-sizing: border-box;
  color: ${({ theme }: { theme: Theme }) => theme.palette.primary.contrastText};
  font-size: 1rem;
  height: 20px;
  padding: 5px 7.5px;
  width: 20px;
`;

export const StyledTitle = styled.span`
  font-weight: 600;
`;
