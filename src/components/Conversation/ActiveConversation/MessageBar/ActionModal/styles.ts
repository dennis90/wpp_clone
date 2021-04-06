import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export interface StyledMessageModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const StyledMessageModal = styled.div<StyledMessageModalProps>`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ open }: StyledMessageModalProps) => (open ? 'calc(100% - 60px)' : '0px')};
  overflow: hidden;
  position: absolute;
  transition: height 0.4s ease-in-out;
  width: 100%;
`;
