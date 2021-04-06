import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export interface StyledContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number;
}

export const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  height: ${({ height }: StyledContainerProps) => height}px;
  overflow: hidden;
`;

export const StyledMessageContainer = styled.div`
  flex: 9;
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
`;
