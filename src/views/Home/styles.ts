import styled from 'styled-components';

export interface StyledContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number;
}

export const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  height: ${({ height }: StyledContainerProps) => height}px;
  overflow: hidden;
`;
